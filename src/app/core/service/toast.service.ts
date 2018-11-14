import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(public toastController: ToastController) {
    }

    public showToast(message: string, duration: number) {
        this.presentToast(message, duration);
    }

    private async presentToast(message: string, duration: number) {
        const toast = await this.toastController.create({
            message: message,
            duration: duration
        });
        toast.present();
    }
}
