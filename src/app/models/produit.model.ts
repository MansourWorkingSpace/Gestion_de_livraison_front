export interface Produit {
  idProd: number;
  nomProd: string;
  categorie: string;
  prix: number;
  description: string;
  image: string;
  disponibilite: boolean;
  quantity: number;
  commercant: {
    id_user: number;
    nom?: string;
    prenom?: string;
  };
}
