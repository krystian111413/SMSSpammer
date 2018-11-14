import {Component, OnInit, ViewChild} from '@angular/core';
import {SmsService} from '../core/service/sms.service';
import {Checkbox, Input} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    @ViewChild('phone') phone: Input;
    @ViewChild('text') text: Input;
    @ViewChild('repeatCount') repeatCount: Input;
    @ViewChild('indexing') indexing: Checkbox;

    constructor(private smsService: SmsService) {

    }

    ngOnInit(): void {

    }

    public async onSendMessage() {
        let defaultNumber = 100000000;
        const phoneNumber = this.phone.value;
        const text = this.text.value;
        const repeat = Number(this.repeatCount.value);
        const indexing = this.indexing.checked;

        for (let i = 0; i < repeat; i++) {
            if (indexing) {
                defaultNumber++;
            }
            this.smsService.sendMessage(phoneNumber, text + defaultNumber);
            await this.delay(300);
        }
    }

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}
