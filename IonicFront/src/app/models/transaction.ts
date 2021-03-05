import {User} from './user';
import {Compte} from './compte';

export class Transaction {
  id?: number;
  montant: number;
  // tslint:disable-next-line:variable-name
  date_depot: any;
// tslint:disable-next-line:variable-name
date_retrait: any;
code: string;
frais: number;
// tslint:disable-next-line:variable-name
frais_depot: number;
// tslint:disable-next-line:variable-name
frais_retrait: number;
// tslint:disable-next-line:variable-name
frais_etat: number;
// tslint:disable-next-line:variable-name
frais_systeme: number;
compte: Compte;
// tslint:disable-next-line:variable-name
user_depot: User;
// tslint:disable-next-line:variable-name
user_retrait: User;
// tslint:disable-next-line:variable-name
client_depot: User;
// tslint:disable-next-line:variable-name
client_retrait: User;
  // tslint:disable-next-line:variable-name
  constructor(montant: number, date_depot: any,
              // tslint:disable-next-line:variable-name
              date_retrait: any, code: string, frais: number,
              // tslint:disable-next-line:variable-name
              frais_depot: number, frais_retrait: number,
              // tslint:disable-next-line:variable-name
              frais_etat: number, frais_systeme: number, user_depot: User,
              // tslint:disable-next-line:variable-name
              user_retrait: User, client_depot: User,
              // tslint:disable-next-line:variable-name
              client_retrait: User, compte: Compte) {
    this.montant = montant;
    this.date_depot = date_depot;
    this.date_retrait = date_retrait;
    this.code = code;
    this.frais = frais;
    this.frais_depot = date_depot;
    this.frais_etat = frais_etat;
    this.frais_retrait = frais_retrait;
    this.frais_systeme = frais_systeme;
    this.user_depot = user_depot;
    this.user_retrait = user_retrait;
    this.client_depot = client_depot;
    this.client_retrait = client_retrait;
    this.compte = compte;
  }
}
