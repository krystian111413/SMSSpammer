import {Injectable} from '@angular/core';
import {SMS} from '@ionic-native/sms/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';

@Injectable({
    providedIn: 'root'
})
export class SmsService {

    constructor(private sms: SMS, private androidPermission: AndroidPermissions) {
    }

    public sendMessage(number: string, text: string) {
        this.sms.hasPermission().then(value => {
            if (value) {
                this.sms.send(number, text);
            } else {
                this.androidPermission.requestPermissions([
                    this.androidPermission.PERMISSION.READ_SMS,
                    this.androidPermission.PERMISSION.RECEIVE_SMS,
                    this.androidPermission.PERMISSION.SEND_SMS
                ]);
            }
        });
    }
}
