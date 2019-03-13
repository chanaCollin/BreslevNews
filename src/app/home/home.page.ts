import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Globals } from '../../providers/globals/globals';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  siteUrl:string;

  constructor(public iab: InAppBrowser,
              public globals:Globals) {

    

  }

  ionViewWillEnter (){
    this.siteUrl = this.globals.siteUrl;
    console.log(this.siteUrl);
  }





}
