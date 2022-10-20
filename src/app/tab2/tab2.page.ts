import { Component } from '@angular/core';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  image: Photo;
  imageUrl: string = '';

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  async takePicture() {
    this.image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    this.imageUrl = this.image.webPath;
    console.log('init');
    console.log('loading');
    const loading = await this.loadingController.create({ message: 'Validando...', mode: 'ios' });
    await new Promise(resolve => setTimeout(resolve, 4000));
    loading.dismiss();
    console.log('alert');
    this.alertController.create({ message: 'No hay coincidencia', mode: 'ios', buttons: ['OK'] });
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(() => resolve, ms))
  }
}
