import { Component } from '@angular/core';
import QRCode from 'qrcode';
//import { Storage } from '@capacitor/storage';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StatusBar } from '@capacitor/status-bar';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  
  IC = '';
  b = '';
  generated = '';
  data: any;

  constructor(private storage: Storage, private router: Router, private alertController: AlertController) {
  }

  ngOnInit () {
    this.data = {};
    this.getValue("ic");

    this.storage.get('ic').then((val) => {
      console.log('val ' + val);
      this.IC = val;
      });

    console.log('Value QR ' + this.IC);

    this.generate;

    StatusBar.setOverlaysWebView({overlay:false})
    StatusBar.setBackgroundColor({color:'#490b6d'})
  }
  
  async scanAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Use QR scanner?',
      message: 'Check vaccination status through other phones QR code.',
      buttons: [ {
        text: 'Okay',
        id: 'confirm-button',
        handler: () => {
          this.router.navigateByUrl('tab2');
        }
      } ]
    });
    await alert.present();
  }

  // get a key/value pair
  getValue(key: string) {
    this.storage.get(key).then((val) => {
      console.log('get ' + key + ' ', val);
      this.data[key] = "";
      this.data[key] = val;

    }).catch((error) => {
    console.log('get error for ' + key + '', error);
  });
}

// Remove a key/value pair
removeKey(key: string) {
  this.storage.remove(key).then(() => {
    console.log('removed ' + key);
    this.data[key] = "";
    this.router.navigateByUrl('tab3');

  }).catch((error) => {
    console.log('removed error for ' + key + '', error);
  })
  ;
}

async generate() {
  const qrcode = QRCode;
    const self = this;
    console.log('Value QR ' + this.IC);
    qrcode.toDataURL(self.IC, { errorCorrectionLevel: 'H' }, function (err, url) {
      self.generated = url;
    })

  }
}
