import { Component, OnDestroy } from '@angular/core';
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnDestroy {
  qrString: string = 'This is a secret';
  scannedResult: any;
  contentVisibility: string = '';

  constructor() {}

  async checkPermission() {
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });
      return status.granted;
    } catch (err) {
      console.log("🚀 ~ file: tab3.page.ts ~ line 20 ~ Tab3Page ~ checkPermission ~ err", err)
    }
  }

  async startScan() {
    try {
      const permission = await this.checkPermission();
      if (!permission) return;

      await BarcodeScanner.hideBackground();
      document.querySelector('body').classList.add('scanner-active');
      this.contentVisibility = 'hidden';
      const result = await BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.CODE_128] });
      console.log("🚀 ~ file: tab3.page.ts ~ line 31 ~ Tab3Page ~ startScan ~ result", result);
      if (result?.hasContent) {
        this.contentVisibility = '';
        this.scannedResult = result.content;
        BarcodeScanner.showBackground();
        document.querySelector('body').classList.remove('scanner-active');
        console.log("🚀 ~ file: tab3.page.ts ~ line 34 ~ Tab3Page ~ startScan ~ scannedResult", this.scannedResult)
      }
    } catch (err) {
      console.log("🚀 ~ file: tab3.page.ts ~ line 37 ~ Tab3Page ~ startScan ~ err", err)
      this.stopScan();
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
    this.contentVisibility = '';
  }

  ngOnDestroy(): void {
    this.stopScan();
  }
}
