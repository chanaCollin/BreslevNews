import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { OneSignal } from '@ionic-native/onesignal';
import { Globals } from '../providers/globals/globals';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage: any = HomePage;
  siteUrl:any;

  constructor(public platform: Platform,
              public splashScreen: SplashScreen,
              public statusBar: StatusBar,
              public network: Network,
              public toastCtrl :ToastController,
              public oneSignal:OneSignal,
              public globals:Globals,
              public iab: InAppBrowser) {
              this.initializeApp();
  }
  

  initializeApp() {


    this.platform.ready().then(() => {
     //this.hideSplashScreen();
    
     //on reconnect
     this.network.onConnect().subscribe(() => {
       try {
         window.location.reload();
       } catch(e) {}
     });      
     //if no internet
     if (this.network.type == 'none' ){
         try {
         } catch(e) {}    
       this.statusBar.styleDefault();
       this.showAlert();
       this.hideSplashScreen();
     }
     //if has internet
     else{
       // watch network for a disconnect
       this.network.onDisconnect().subscribe(() => {
         try {
         } catch(e) {}    
         this.showAlert();
       });   
        this.configoneSignal().then(() => 
          this.showIframe()
        )
      
     }
   }) 

  }

  private hideSplashScreen(){
    return new Promise(resolve => {
      console.log('hideSplashScreen');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      resolve('this.splashScreen');
    });
  }

  async showAlert() {
    const toast = await this.toastCtrl.create({
      message: 'אנא בדוק את החיבור לאינטרנט',
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'סגור'
    });
    toast.present();
  }


  private configoneSignal(){
    return new Promise(resolve => {
      console.log('configoneSignal');
      if(this.platform.is('cordova')){        
        this.oneSignal.startInit('bebae16c-8ae0-488d-9953-dbc5b989c08a', '284483282175');
        this.oneSignal.addSubscriptionObserver().subscribe((state) => {console.log('addSubscriptionObserver: ',state)});
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
        this.oneSignal.handleNotificationReceived().subscribe((jsonData) => {
          console.log('oneSignal Received:', jsonData);
        });
        this.oneSignal.handleNotificationOpened().subscribe((jsonData) => {
          console.log('oneSignal Opened:', jsonData)
        });
        this.oneSignal.endInit();
        resolve(this.oneSignal);
      }else{
        console.log('WORNING configoneSignal: not cordova');
        
      }
      resolve('WORNING');
    });
   }


   showIframe(){
    this.siteUrl = this.globals.siteUrl;
    const options: InAppBrowserOptions = {
      toolbar: 'no',
      location: 'no',
      zoom: 'no'
    };
    let browser = this.iab.create(this.siteUrl,'_blank',options);
    browser.on('loadstop').subscribe(()=>{
      this.hideSplashScreen();
    })
    browser.on('exit').subscribe((data)=>{
      this.platform.exitApp();
    })
  }


}

