import { Injectable } from '@angular/core';
import {
  Plugins, CameraResultType, Capacitor, FilesystemDirectory,
  CameraPhoto, CameraSource
} from '@capacitor/core';

const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class CameraService {


  async getPhoto(){
    const capturedPhoto = await Camera.getPhoto({
      resultType:CameraResultType.Base64,
      source:CameraSource.Camera,
      quality:100
    })

    return capturedPhoto
  }

}
