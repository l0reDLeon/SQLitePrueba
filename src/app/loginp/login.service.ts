import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../usuario/usuario.model';
import {map,tap} from 'rxjs/operators';

export interface LoginResponseData{
  kind:string,
  idToken:string,
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string;
  registered?:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _usuario = new BehaviorSubject<Usuario>(null);

  constructor(private http:HttpClient) { }

  login(email: string, password: string){
    return this.http.post<LoginResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.fireToken}`,
    {email: email, password: password, returnSecureToken: true}
    ).pipe(tap(this.setUserDate.bind(this)));
  }

  get usuarioId(){
    return this._usuario.asObservable().pipe(map(user=>{
    if(user){
      console.log(user);
      return user.id;
    }
    else{
      return null;
    }
    }));
  }

  get usuarioLoggeado(){
    //  return this._usuarioLoggeado;
        return this._usuario.asObservable().pipe(map(user =>{
          if(user){
            return !!user.token;
          }
          else{
            return false;
          }
        }));
     }


  logout(){
    //  this._usuarioLoggeado = false;
    this._usuario.next(null);
     }

  private setUserDate(userData:LoginResponseData){
    const expTime = new Date(new Date().getTime()+(+userData.expiresIn*1000));
    this._usuario.next(new Usuario(userData.localId,userData.email,userData.idToken,expTime));
   };

}
