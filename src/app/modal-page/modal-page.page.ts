import { Component, Input, OnInit } from '@angular/core';
import { ServicesService, Note } from '../services.service';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {

  @Input() id: string;
  note: Note = null;

  constructor(private dataService: ServicesService, private modalctrl: ModalController, private toastCtrl: ToastController) { }
  
  ngOnInit() { 
    this.dataService.searchid(this.id).subscribe(res => {
      this.note = res;
    });
  }

  async updateid() {
    this.dataService.updateid(this.note);
      const toast = await this.toastCtrl.create({
        message: 'Note updated! ',
        duration: 1000
        });
    toast.present ();
    }

    async deleteid() {
      this.dataService.deleteid(this.note);
        const toast = await this.toastCtrl.create({
          message: 'Note Deleted! ',
          duration: 1000
          });
      toast.present ();
      this.modalctrl.dismiss();
      }
}
