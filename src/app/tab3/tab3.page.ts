import { ChangeDetectorRef, Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Note, ServicesService } from '../services.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  filterTerm: number;
  notes: Note[] = [];

  constructor(private dataService: ServicesService,  private cd: ChangeDetectorRef, private toastCtrl: ToastController) {
  }

  async ngOnInit() {

    this.dataService.getid().subscribe(res => {
      this.notes = res;
      this.cd.detectChanges();
    });
  }


  async openNote(vaksin: Note) {
    const toast = await this.toastCtrl.create({
      message: 'Data Deleted!.',
      duration: 1000
    });
    toast.present();
  }
}