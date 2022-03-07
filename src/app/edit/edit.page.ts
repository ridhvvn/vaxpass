import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ServicesService, Note } from '../services.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  ic = [];
  note: Note = null;

  constructor(private dataService: ServicesService, private alertCtrl: AlertController, private toastCtrl: ToastController) {
    
  }

  ngOnInit() {
    this.dataService.getid().subscribe(res => {
      this.ic = res; 
    })
  }

  async addNote(note) {
    this.dataService.addid({nama: note.nama, ic: note.ic, status: note.status});
    const toast = await this.toastCtrl.create({
      message: 'New Data Added!',
      duration: 1000
      });
  toast.present ();
  }
    
}
