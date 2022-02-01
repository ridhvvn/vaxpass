import { Component } from '@angular/core';
import QRCode from 'qrcode';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  nama = '';
  ic = '';
  generated = '';

  genResult() {
    return this.generated !== '';
  }

  constructor() {}

  generate() {
    const qrcode = QRCode;
    const self = this;
    qrcode.toDataURL(self.ic, { errorCorrectionLevel: 'H' }, function (err, url) {
      self.generated = url;
    })
  }

}
