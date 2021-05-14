import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { user } from './perfil.model';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private storage: SQLiteObject;
  usuariosList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'positronx_db.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
      });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchUsuarios(): Observable<user[]> {
    return this.usuariosList.asObservable();
  }

    // Render fake data
    getFakeData() {
      this.httpClient.get(
        'assets/usuarios.sql',
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            this.getUsuarios();
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }

  // Get list
  getUsuarios(){
    return this.storage.executeSql('SELECT * FROM usuarios', []).then(res => {
      let items: user[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          // if(res.rows.item(i).usuario_id == 1){ ////////////////////////////////////////////////////////////////////////////////////////////////
            items.push({
              nombre: "res.rows.item(i).nombre",
              fecha_nac: "res.rows.item(i).fecha_nac",
              reside: "res.rows.item(i).reside",
              email:res.rows.item(i).email,
              descrip: res.rows.item(i).descrip,
              imagen: res.rows.item(i).imagen,
              usuario_id:res.row.item(i).usuario_id
             });
          // }
        }
      }else{
        items.push({
          nombre: "res.rows.item(i).nombre",
          fecha_nac: "res.rows.item(i).fecha_nac",
          reside: "res.rows.item(i).reside",
          email:"res.rows.item(i).email",
          descrip: "res.rows.item(i).descrip",
          imagen: "res.rows.item(i).imagen",
          usuario_id:"res.row.item(i).usuario_id"
         });
      }
      this.usuariosList.next(items);
    });
  }

//   export class user {
//     nombre: number;
//     fecha_nac: string;
//     reside:string;
//     email:string;
//     descrip: string;
//     imagen: string;
//     usuario_id: string;
// }
  addUsuario(nombre,fecha_nac,reside,email,descrip,imagen,usuario_id) {
    let data = [nombre,fecha_nac,reside,email,descrip,imagen,usuario_id];
    return this.storage.executeSql('INSERT INTO usuarios (nombre,fecha_nac,reside,email,descrip,imagen,usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?)', data)
    .then(res => {
      this.getUsuarios();
    });
  }

  // Get single object
  getUsuario(usuario_id): Promise<user> {
    return this.storage.executeSql('SELECT * FROM usuarios WHERE usuario_id = ?', [usuario_id]).then(res => {
      return {
        nombre: res.rows.item(0).nombre,
        fecha_nac: res.rows.item(0).fecha_nac,
        reside: res.rows.item(0).reside,
        email: res.rows.item(0).email,
        descrip: res.rows.item(0).descrip,
        imagen: res.rows.item(0).imagen,
        usuario_id: res.rows.item(0).usuario_id,
      }
    });
  }

  // // Update
  // updateUsuario(usuario_id, user: user) {
  //   let data = [user.nombre,user.fecha_nac,user.reside,useremail,user.descrip,user.imagen,user.usuario_id];
  //   return this.storage.executeSql(`UPDATE usuarios SET nombre = ?,fecha_nac = ?,reside = ?,email = ?,descrip = ?,imagen = ? WHERE usuario_id = ${usuario_id}`, data)
  //   .then(data => {
  //     this.getUsuario();
  //   })
  // }

  // // Delete
  // deleteUsuario(usuario_id) {
  //   return this.storage.executeSql('DELETE FROM usuarios WHERE usuario_id = ?', [usuario_id])
  //   .then(_ => {
  //     this.getUsuario();
  //   });
  // }
}
