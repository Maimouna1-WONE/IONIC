import {Profil} from './profil';

export class User {
  id?: number;
  email: string;
  password?: string;
  prenom: string;
  nom: string;
  adresse: string;
  telephone: string;
  avatar?: any;
  token?: string;
  statut?: boolean;
  profil?: Profil;
  constructor(id: number, password: string,
              prenom: string, nom: string, adresse: string,
              telephone: string, email: string, profil: Profil, avatar: any) {
    this.id = id;
    this.password = password;
    this.prenom = prenom;
    this.nom = nom;
    this.adresse = adresse;
    this.telephone = telephone;
    this.email = email;
    this.profil = profil;
    this.avatar = avatar;
  }
}

