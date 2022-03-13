import { Component } from '@angular/core';
import QRCode from 'qrcode';
//import { Storage } from '@capacitor/storage';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';


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

  constructor(private storage: Storage, private router: Router) {
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
