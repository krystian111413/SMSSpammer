import {Component, OnInit, ViewChild} from '@angular/core';
import {SmsService} from '../core/service/sms.service';
import {Checkbox, Input} from '@ionic/angular';
import {ToastService} from '../core/service/toast.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    @ViewChild('phone') phone: Input;
    @ViewChild('text') text: Input;
    @ViewChild('repeatCount') repeatCount: Input;
    @ViewChild('delaySendingMessage') delaySendingMessage: Input;
    @ViewChild('indexing') indexing: Checkbox;

    constructor(private smsService: SmsService, private toastService: ToastService) {

    }

    ngOnInit(): void {
    }

    public async onSendMessage() {

        if (!this.checkInput()) {
            this.toastService.showToast('Set all data, please!', 2000);
            return;
        }

        let defaultNumber = 100000000;
        const phoneNumber = this.phone.value;
        const text = this.text.value;
        const repeat = Number(this.repeatCount.value);
        const delay = Number(this.delaySendingMessage.value);
        const indexing = this.indexing.checked;

        for (let i = 0; i < repeat; i++) {
            let textTmp = text;
            if (indexing) {
                defaultNumber++;
                textTmp += defaultNumber;
            }
            this.smsService.sendMessage(phoneNumber, textTmp);
            await this.delay(delay);
        }
        this.toastService.showToast('Messages sended', 2000);
    }

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private checkInput() {
        return !(this.phone.value === ''
            || this.phone.value.length < 9
            || this.text.value === ''
            || this.repeatCount.value === ''
            || this.delaySendingMessage.value === '');
    }
}
