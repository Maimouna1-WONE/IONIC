import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {User} from '../models/user';
import {ConnexionService} from './connexion.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {
  cle = 'eye-off';
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  dtee: User;
  isActiveToggleTextPassword = true;
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: ConnexionService )
  {
    if (this.authenticationService.currentUserValue){
      this.router.navigate(['/']);
    }
  }
  // tslint:disable-next-line:typedef
  get f()
  {
    return this.loginForm.controls;
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }
  // tslint:disable-next-line:typedef
  onSubmit()
  {
    this.submitted = true;
    if (this.loginForm.invalid){
      return;
    }
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data === 'ROLE_ADMIN_SYS')
          {
            console.log('good AS');
          }
          else if (data === 'ROLE_ADMIN_AGENCE')
          {
            this.returnUrl = '';
          }
          else if (data === 'ROLE_UTILISATEUR_AGENCE')
          {
            this.returnUrl = '';
          }
          else if (data === 'ROLE_CAISSIER')
          {
            console.log('good C');
          }
          else if (data === 'ROLE_CLIENT')
          {
            this.returnUrl = '/client';
          }
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
        }
      );
  }
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
  public toggleTextPassword(): void{
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword !== true);
    if (this.isActiveToggleTextPassword) {
      this.cle = 'eye-off';
    }
    else{
      this.cle = 'eye';
    }
  }
  public getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'text';
  }
}
