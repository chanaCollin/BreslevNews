import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { OneSignal } from '@ionic-native/onesignal';
import { Globals } from '../providers/globals/globals';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Device } from '@ionic-native/device';
import { AppVersion } from '@ionic-native/app-version';
import { ServerApiRequest } from '../providers/server-api-request/server-api-request';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage: any = HomePage;
  siteUrl:any;
  app_version: any;
  app_device_type: any;
  oneSignal_id: any;
  user_data = [];
  options: InAppBrowserOptions = {
    toolbar: 'no',
    location: 'no',
    zoom: 'no'
  };



  constructor(public platform: Platform,
              public splashScreen: SplashScreen,
              public statusBar: StatusBar,
              public network: Network,
              public toastCtrl :ToastController,
              public oneSignal:OneSignal,
              public globals:Globals,
              public iab: InAppBrowser,
              public device:Device,
              public appVersion: AppVersion,
              public serverApiRequest: ServerApiRequest ) {
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
        this.configoneSignal().then(() => {
          this.showIframe();
          this.updateRegisterdUserData().then(()=>{
            let sendData = {
              app_version: this.app_version,
              app_device_type: this.app_device_type,
              one_signal_id: this.oneSignal_id     
            }
          
            this.serverApiRequest.setUserData(sendData).subscribe(data => {
              //console.log("data: "+data.row_id);
              //this.showIframe();
            });  
          });
        })
      
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
          console.log('oneSignal Opened:', jsonData);
          let page_url = jsonData.notification.payload.additionalData.page_url;
          if(page_url){
            //open url page
            var scriptOpenPage = window.location.href = page_url;
            let browser = this.iab.create(this.siteUrl,'_blank',this.options);
            browser.executeScript({ code: scriptOpenPage });
          }
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
    
    let browser = this.iab.create(this.siteUrl,'_blank',this.options);
    browser.on('loadstop').subscribe(()=>{
      this.hideSplashScreen();
    })
    browser.on('exit').subscribe((data)=>{
      this.platform.exitApp();
    })
  }

  updateRegisterdUserData(){
      
    return new Promise(resolve => {
      //get device
      if(this.platform.is('cordova')){
        this.app_device_type = this.device.platform+','+this.device.model+','+this.device.manufacturer;
      }else{
        this.app_device_type = 'Unknown browser';
      }

      if(this.platform.is('cordova')){
        this.appVersion.getVersionNumber().then((app_version)=>{
          this.app_version = app_version;
          //get oneSignal_id
          this.oneSignal.getIds().then((ids) => {      
            this.oneSignal_id = ids.userId;
            this.oneSignal.sendTag('user_type','client');  
            resolve('Done');
          }).catch(()=>{
            this.oneSignal_id = 'Unknown browser';        
            resolve('Done');
          });  
        }).catch(()=>{
          this.app_version = 'Unknown browser';
          this.oneSignal_id = 'Unknown browser';        
          resolve('Done');
        });    
      }else{
        this.app_version = 'Unknown browser';
        this.oneSignal_id = 'Unknown browser';        
        resolve('Done');
      }

    });
  }


}

