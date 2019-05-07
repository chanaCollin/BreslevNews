import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Globals } from '../../providers/globals/globals';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  siteUrl:any;
  constructor(public navCtrl: NavController,
              public globals:Globals,
              public iab: InAppBrowser ) {

  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad");
    this.showIframe();
  }
  ionViewWillEnter(){
    console.log("ionViewWillEnter");
  }
  ionViewDidEnter(){
    console.log("ionViewDidEnter");
  }

  showIframe(){
    this.siteUrl = this.globals.siteUrl;
    const options: InAppBrowserOptions = {
      toolbar: 'no',
      location: 'no',
      zoom: 'no'
    };
    const browser = this.iab.create(this.siteUrl,'_blank',options);
  }

}
