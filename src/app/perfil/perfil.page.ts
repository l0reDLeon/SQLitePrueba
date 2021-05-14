import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";
import { PerfilService } from './perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(
    private db: PerfilService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router
  ) { }

  mainForm: FormGroup;
  Data: any[] = [];

  ngOnInit(){
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchUsuarios().subscribe(item => {
          this.Data = item
        })
      }
    });

    // this.mainForm = this.formBuilder.group({
    //   usuario_id: [''],
    //   nombre: [''],
    //   fecha: [''],
    //   hora: [''],
    //   sintomas: ['']
    // })
  }

  // storeData() {
  //   this.db.addCita(
  //     this.mainForm.value.usuario_id,
  //     this.mainForm.value.nombre,
  //     this.mainForm.value.fecha,
  //     this.mainForm.value.hora,
  //     this.mainForm.value.sintomas,
  //   ).then((res) => {
  //     this.mainForm.reset();
  //   })
  // }

  // deleteCita(id){
  //   this.db.deleteCita(id).then(async(res) => {
  //     let toast = await this.toast.create({
  //       message: 'Cita borrada',
  //       duration: 2500
  //     });
  //     toast.present();
  //   })
  // }

}
