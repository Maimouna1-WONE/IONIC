import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FraisService{
  frais: number;
  constructor() { }

  calculerFrais(montant: number){
    if (montant >= 0 && montant <= 5000){
      this.frais = 425;
    }
    if (montant > 5000 && montant <= 10000){
      this.frais = 850;
    }
    if (montant > 10000 && montant <= 15000){
      this.frais = 1270;
    }
    if (montant > 15000 && montant <= 20000){
      this.frais = 1695;
    }
    if (montant > 20000 && montant <= 50000){
      this.frais = 2500;
    }
    if (montant > 50000 && montant <= 60000){
      this.frais = 3000;
    }
    if (montant > 60000 && montant <= 75000){
      this.frais = 4000;
    }
    if (montant > 75000 && montant <= 120000){
      this.frais = 5000;
    }
    if (montant > 120000 && montant <= 150000){
      this.frais = 6000;
    }
    if (montant > 150000 && montant <= 200000){
      this.frais = 7000;
    }
    if (montant > 200000 && montant <= 250000){
      this.frais = 8000;
    }
    if (montant > 250000 && montant <= 300000){
      this.frais = 9000;
    }
    if (montant > 300000 && montant <= 400000){
      this.frais = 12000;
    }
    if (montant > 400000 && montant <= 750000){
      this.frais = 15000;
    }
    if (montant > 750000 && montant <= 900000){
      this.frais = 22000;
    }
    if (montant > 900000 && montant <= 1000000){
      this.frais = 25000;
    }
    if (montant > 1000000 && montant <= 1125000){
      this.frais = 27000;
    }
    if (montant > 1125000 && montant <= 1400000){
      this.frais = 30000;
    }
    if (montant > 1400000 && montant <= 2000000){
      this.frais = 30000;
    }
    if (montant > 2000000 && montant <= 2500000){
      this.frais = (2 * montant) / 100;
    }
    return this.frais;
  }
}
