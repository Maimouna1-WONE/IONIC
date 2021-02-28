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
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  dtee: User;
  hide = true;
  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: ConnexionService )
  {
    if (this.authenticationService.currentUserValue){
      this.router.navigate(['/']);
    }
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }
  // tslint:disable-next-line:typedef
  get f()
  {
    return this.loginForm.controls;
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
            //this.returnUrl = '';
          }
          else if (data === 'ROLE_ADMIN_AGENCE')
          {
            //console.log('good AA');
            this.returnUrl = '';
          }
          else if (data === 'ROLE_UTILISATEUR_AGENCE')
          {
            console.log('good UA');
            //this.returnUrl = 'apprenant';
          }
          else if (data === 'ROLE_CAISSIER')
          {
            console.log('good C');
            //this.returnUrl = 'cm';
          }
          //console.log('bakhna deiii');
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
        }
      );
  }
}
