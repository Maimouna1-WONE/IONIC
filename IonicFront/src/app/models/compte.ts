import {User} from './user';
import {Transaction} from './transaction';

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
  transactions: Transaction[];
  // tslint:disable-next-line:variable-name
  constructor(numero: string, solde: number, created_at: any,
              user: User,
              // tslint:disable-next-line:variable-name
              date_depot: any, transactions: Transaction[]) {
    this.numero = numero;
    this.solde = solde;
    this.created_at = created_at;
    this.user = user;
    this.date_depot = date_depot;
    this.transactions = transactions;
  }
}
