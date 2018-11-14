import {Component, OnInit} from '@angular/core';
import {SmsService} from '../core/service/sms.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    constructor(private smsService: SmsService) {

    }

    ngOnInit(): void {

    }


}
