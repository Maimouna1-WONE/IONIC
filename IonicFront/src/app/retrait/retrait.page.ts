import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AlertController} from "@ionic/angular";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TransactionService} from "../services/transaction.service";
import {Transaction} from "../models/transaction";

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.page.html',
  styleUrls: ['./retrait.page.scss'],
})
export class RetraitPage implements OnInit {

  public segment = 'list'; page: string;
  addForm: FormGroup; submitted: boolean;
  info: Transaction; code: string;
  constructor(private route: Router,
              private alertController: AlertController,
              private formBuilder: FormBuilder,
              private transactionservice: TransactionService) { }

  ngOnInit() {
    this.page = this.route.url.substr(1);
    this.addForm = this.formBuilder.group({
      code: ['', Validators.required],
      destinataire: new FormGroup({
        cni: new FormControl()
      })
    });
  }
  get f()
  {
    return this.addForm.controls;
  }
  getTransaction(){
    this.transactionservice.getByCode(JSON.stringify(this.code)).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }
  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }
  OnSubmit() {
    this.transactionservice.RetraitClient(this.addForm.value).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
    console.log(this.addForm.value);
  }
}
