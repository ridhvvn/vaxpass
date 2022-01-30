import { Component, ElementRef, ViewChild } from '@angular/core';
import jsQR from 'jsqr';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx/';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  scanActive = false;
  scanResult = null;

  @ViewChild('video', { static: false }) video: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;

  videoElement: any;
  canvasElement: any;
  canvasContext: any;

  constructor(private androidPermissions: AndroidPermissions) {}

  ngAfterViewInit() {
    this.videoElement = this.video.nativeElement;
    this.canvasElement  = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
  }

  

  async startScan(){
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment'}
    });
    this.videoElement.srcObject = stream;
    this.videoElement.setAttribute('playsinline', true);
    this.videoElement.play();
    requestAnimationFrame(this.scan.bind(this));
  }

  scan() {

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );
    
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);

    console.log('SCAN');

    if(this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA){
      this.scanActive = true;

      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;

      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });
    
      console.log('code: ', code);

      if (code) {
        this.scanActive = false;
        this.scanResult = code.data;

      } else {
        if (this.scanActive) {

        }
        requestAnimationFrame(this.scan.bind(this));
      }

    } else {
      requestAnimationFrame(this.scan.bind(this));
    }
  }

  stopScan(){
    this.scanActive = false;
  }

  reset(){
    this.scanResult = null;
  }
}
