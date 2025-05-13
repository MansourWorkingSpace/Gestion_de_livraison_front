import { Component,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommandeService } from '../../services/commande.service';
import { ToastrService } from 'ngx-toastr';
import jsQR from 'jsqr';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.css'],
  standalone: true
})
export class QrScannerComponent implements AfterViewInit {
  scannedId: string | null = null;

  constructor(
    private commandeService: CommandeService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngAfterViewInit(): void {
    const video = document.querySelector('video')!;
    const canvas = document.querySelector('canvas')!;
    const ctx = canvas.getContext('2d')!;

    // Accéder à la caméra
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } }) // Utilise la caméra arrière
      .then(stream => {
        video.srcObject = stream;
        video.play();

        // Vérifier chaque image capturée pour détecter un code QR
        const interval = setInterval(() => {
          if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, canvas.width, canvas.height);

            if (code) {
              this.scannedId = code.data; // Stocke le résultat du scan
              clearInterval(interval); // Arrête la boucle après avoir scanné
              stream.getTracks().forEach(track => track.stop()); // Éteint la caméra

              // Convertir le résultat du scan en nombre
              const id = parseInt(this.scannedId!, 10);
              if (!isNaN(id)) {
                this.handleScannedId(id); // Traiter le scan
              } else {
                this.toastr.error('Le code QR ne contient pas un ID valide.');
              }
            }
          }
        }, 500); // Vérifie toutes les 500 ms
      })
      .catch(err => console.error("Erreur lors de l'accès à la caméra :", err));
  }

  /**
   * Méthode pour traiter l'ID scanné
   */
  handleScannedId(id: number): void {
    // Appeler updateStatutCommande pour mettre le statut à "livré"
    this.commandeService.updateStatutCommande(id, 'livré').subscribe({
      next: () => {
        this.toastr.success('Statut mis à jour : livré.');

        // Appeler updateCommandeFromQrCode pour marquer la commande comme payée
        this.commandeService.updateCommandeFromQrCode(id).subscribe({
          next: () => {
            this.toastr.success('Commande mise à jour : payée.');
            this.router.navigate(['/dashbord']); // Redirection vers le tableau de bord
          },
          error: (err) => {
            console.error('Erreur lors de la mise à jour de la commande via QR code :', err);
            this.toastr.error('Erreur lors de la mise à jour de la commande.');
          }
        });
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du statut :', err);
        this.toastr.error('Erreur lors de la mise à jour du statut.');
      }
    });
  }
}