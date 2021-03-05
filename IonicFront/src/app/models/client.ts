
export class Client {
  id?: number;
  prenom: string;
  nom: string;
  cni?: string;
  telephone: string;
  constructor(id: number,
              prenom: string, nom: string,
              telephone: string, cni: string) {
    this.id = id;
    this.cni = cni;
    this.prenom = prenom;
    this.nom = nom;
    this.telephone = telephone;
  }
}

