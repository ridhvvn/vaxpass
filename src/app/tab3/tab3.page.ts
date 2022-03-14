import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Storage } from '@ionic/storage';
import { StatusBar } from '@capacitor/status-bar';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  data: any;
  ic = '';
  ICformGroup: FormGroup;
  isSubmitted = false;

  constructor(private storage: Storage, private router: Router, public formBuilder: FormBuilder) {
    this.data = {};
    this.removeKey("ic");
  }

  ngOnInit() {
    this.ICformGroup = this.formBuilder.group({
      formIC: ['', [Validators.required, Validators.minLength(12), Validators.pattern('^[0-9]+$'), Validators.maxLength(12)]],
   })

   StatusBar.setOverlaysWebView({overlay:false})
   StatusBar.setBackgroundColor({color:'#e89dff'})

  }

  get errorControl() {
    return this.ICformGroup.controls;
  }

  submitForm() {
    this.isSubmitted = true;

    if (this.ICformGroup.valid) {
      //Set Integer Value
      this.ic = this.ICformGroup.get('formIC').value;
      this.setValue("ic", this.ic);
      this.router.navigateByUrl('tab1');
      console.log("Ic value:" + this.ic)

    } else {
      console.log(this.ICformGroup.value)
    }
  }

  // set a key/value
  setValue(key: string, value: any) {
    this.storage.set(key, value).then((response) => {
      console.log('set' + key + ' ', response);

    }).catch((error) => {
      console.log('set error for ' + key + ' ', error);
    });
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
    }).catch((error) => {
      console.log('removed error for ' + key + '', error);
    });
  }

}