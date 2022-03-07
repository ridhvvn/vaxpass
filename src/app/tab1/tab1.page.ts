import { Component } from '@angular/core';
import QRCode from 'qrcode';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  ic = '';
  generated = '';

  genResult() {
    return this.generated !== '';
  }

  notes = [];
  id = [];

  constructor(private dataService: ServicesService) {
    this.dataService.getid().subscribe(res => {
      this.id = res; 
    })
  }

  generate() {
    const qrcode = QRCode;
    const self = this;
    qrcode.toDataURL(self.ic, { errorCorrectionLevel: 'H' }, function (err, url) {
      self.generated = url;
    })
  }

  openNote(note){
    this.notes = this.id;
  }

}
