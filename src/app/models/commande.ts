import { CommandeStatus } from '../enums/commande-status';

export interface Commande {
  idCmd: number;
  adresse: string;
  codePostale: string;
  statut: CommandeStatus; // Utilisez l'énumération
  dateCmd?: Date;
  estpayee: boolean;
  prixTotale: number;
  produit?: string;
}