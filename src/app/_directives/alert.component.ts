import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from '../_services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html'
})
export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    show: boolean = false;
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.subscription = this.alertService.getMessage().subscribe(message => {
            this.show = true;
            this.message = message;
            setTimeout(function () {
                this.show = false;
            }.bind(this), 3000);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}