import { Component } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private platform: Platform,
    private oneSignal: OneSignal,
    private alert: AlertController
  ) {
    this.initializeApp();
  }

  private initializeApp() {
    this.platform.ready().then(
      () => {
        this.setupOneSignal();
      }
    );
  }

  private setupOneSignal() {
    this.oneSignal.startInit('', '');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

    this.oneSignal.handleNotificationReceived().subscribe(
      data => {
        let notificationMsg = data.payload.body;
        let notificationTitle = data.payload.title;

        this.showNotitication(notificationTitle, notificationMsg);
      }
    );

    this.oneSignal.handleNotificationOpened().subscribe(
      data => {
        let notificationMsg = data.notification.payload.body;
        let notificationTitle = data.notification.payload.title;

        this.showNotitication(notificationTitle, notificationMsg);
      }
    );

    this.oneSignal.endInit();
  }

  private showNotitication(title: string, message: string) {
    this.alert.create({
      header: title,
      message: message,
      buttons: [{
        text: "Ok"
      }]
    }).then(ele => {
      ele.present();
    });
  }
}