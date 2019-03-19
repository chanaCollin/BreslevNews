import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Globals } from '../../providers/globals/globals';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  siteUrl:any;

  constructor(public iab: InAppBrowser,
              public globals:Globals,
              public sanitizer:DomSanitizer,
              public toast: ToastController,
              public splashScreen: SplashScreen,
              public network: Network ) {
  }

  ionViewWillEnter (){

this.splashScreen.show();    
    if (this.network.type == 'none' ){
      console.log("not net");
      this.splashScreen.show();    
    }
    else{
      this.siteUrl = this.globals.siteUrl;
      this.siteUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.siteUrl);
      console.log("siteUrl",this.siteUrl);
    }
  }




}
