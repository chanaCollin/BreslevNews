import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Globals } from '../../providers/globals/globals';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  siteUrl:any;

  constructor(public iab: InAppBrowser,
              public globals:Globals,
              public sanitizer:DomSanitizer ) {

    

  }

  ionViewWillEnter (){
    this.siteUrl = this.globals.siteUrl;

      this.siteUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.siteUrl);
    console.log(this.siteUrl);
  }





}
