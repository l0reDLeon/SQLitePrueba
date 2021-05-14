import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
// import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LoginResponseData, LoginService } from './login.service';

@Component({
  selector: 'app-loginp',
  templateUrl: './loginp.page.html',
  styleUrls: ['./loginp.page.scss'],
})
export class LoginpPage implements OnInit {

    datosForm: FormGroup;
    isLoading:boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private LoginService: LoginService,
    private loadingCtrl:LoadingController,
    private alertCtrl:AlertController,
    // private toastr: ToastrService
  ) {
    this.datosForm = this.formBuilder.group({

      email: new FormControl("",Validators.compose([
        Validators.required,
        Validators.pattern("^[^@]+@[^@]+\.[a-zA-Z]{2,}$")
      ])),

      password: new FormControl("",Validators.compose([
        Validators.required,
        // Validators.pattern("^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$")
      ])),

      // weather: new FormControl("", Validators.compose([
      //   Validators.required,
      //   Validators.pattern("^[0-9]*$")
      // ]))

    });
   }

  ngOnInit() {

  }

  logIn(){
  this.router.navigateByUrl('/tabs/tabs');
  }

  register(){
    this.router.navigateByUrl('/register');
  }

  test(){
    this.router.navigateByUrl('/login');
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }

  abc(datos){
    this.Going(datos);
  }

  Going(grupo: any){

    const email = grupo.email;
    const password = grupo.password;

    this.addData(email, password);
  }


  addData(email: string, pass: string ){
    this.isLoading = true;

    // this.loginService.login();

    this.loadingCtrl.create({
      keyboardClose: true,
      message: 'Validando...'
    })
    .then(loadingEl =>
      {
        loadingEl.present();
        let authObs: Observable<LoginResponseData>;

        authObs = this.LoginService.login(email, pass);

        authObs.subscribe(response =>{
          console.log(response);
          // this.toastr.success('Sesion Iniciada Exitosamente','Bienvenido de nuevo!');

          this.isLoading =  false;
          loadingEl.dismiss();
          this.router.navigateByUrl('/home');
        },
        errorResponse =>{
          this.isLoading = false;
          loadingEl.dismiss();
          const error = errorResponse.error.error.message;

          this.alertCtrl.create({
            header:"Error",
            message: "Ha ocurrido un error",
            buttons:['OK']
          }).then(alertEl=>alertEl.present());
          // this.toastr.error('Algo ha salido mal','Error');
        });
      });

  }

}
