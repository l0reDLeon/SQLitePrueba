import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './loginp/login.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private loginService: LoginService,
    private router: Router
    ) {}
  CerrarSesion(){
    this.loginService.logout();
    this.router.navigateByUrl('/login');
  }
}
