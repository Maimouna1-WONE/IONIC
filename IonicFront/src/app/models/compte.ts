import {User} from './user';

export class Compte {
  id?: number;
  numero: string;
  solde: number;
  // tslint:disable-next-line:variable-name
  created_at: any;
  user: User;
  // tslint:disable-next-line:variable-name
  date_depot: number;
  // tslint:disable-next-line:variable-name
  constructor(numero: string, solde: number, created_at: any, user: User, date_depot: any) {
    this.numero = numero;
    this.solde = solde;
    this.created_at = created_at;
    this.user = user;
    this.date_depot = date_depot;
  }
}
