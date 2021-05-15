import { receta } from './../recetas/receta.model';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { RecetasService } from '../recetas/recetas.service';
import { Subscription } from 'rxjs';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'app-recetas-single',
  templateUrl: './recetas-single.page.html',
  styleUrls: ['./recetas-single.page.scss'],
})
export class RecetasSinglePage implements OnInit {
  isLoading: boolean;

  receta: receta;
  recetaSub: Subscription;
  id: string;
  public previsualizacion: string ;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recetasService: RecetasService,
    private router: Router, // se agrega este parametro para navegar a otra pantalla
    private alertCtrl: AlertController, //se agrega este parametro para mostrar el alerta
    private navCtrl: NavController,
    private cameraService: CameraService,
    private formBuilder: FormBuilder
  ) {
  }

  recipeForm: FormGroup;
  Receta: receta;

  ngOnInit() {
      //construye el form inicianizandolo con valores vacíos
      this.recipeForm = this.formBuilder.group({
        titulo: [''],
        ingredientes: [''],
        procedimiento: ['']
      });

    console.log("recetas")
    this.activatedRoute.paramMap.subscribe((paramM) => {
      const param: string = 'id';
      if (!paramM.has(param)) {
        //redirect
        this.navCtrl.navigateBack('');
        return;
      }

      this.id = paramM.get(param);
      // this.previsualizacion ='https://www.drupal.org/files/issues/2019-07-21/missing.png';

      this.isLoading = true;

      this.recetaSub = this.recetasService
        .getReceta(this.id)
        .subscribe(
          (rest) => {
            this.receta = rest;
            console.log(rest);
              this.previsualizacion =this.receta.imagen;
            this.isLoading = false;
          },
          (error) => {
            alert('No se encontro la receta');
          }
        );
    });
  }

  storeNewRecipe(){
    this.Receta = new receta(
      this.id,
      this.recipeForm.value.titulo,
      this.recipeForm.value.ingredientes,
      this.recipeForm.value.procedimiento,
      this.previsualizacion
    );

    this.recetasService.updateReceta(this.id, this.Receta);
    alert("Ha sido actualizado con exito");
  }

  async takePhoto(){
    const photo = await this.cameraService.getPhoto()
    this.previsualizacion = 'data:image/jpeg;base64,'+ photo.base64String;
  }



}
