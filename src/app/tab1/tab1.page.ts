import { Component } from '@angular/core';
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  showButton: boolean = true;

  constructor() { }

  prepare() {
    BarcodeScanner.prepare();
  };

  async startScan() {
    this.showButton = false;
    BarcodeScanner.hideBackground();
    document.querySelector('body').classList.add('scanner-active');
    const result = await BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.CODE_128] });
    if (result.hasContent) {
      console.log(result.content);
      this.showButton = true;
    }
  };

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  };

  async scan() {
    this.prepare();

    const c = confirm('Do you want to scan a barcode?');

    if (c) {
      this.startScan();
    } else {
      this.stopScan();
    }
  }

}
