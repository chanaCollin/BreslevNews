import { Component } from '@angular/core';

import { Platform, ToastController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  networkToast: Toast;


  constructor(
    public platform: Platform,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public network: Network,
    public toastCtrl :ToastController,
    public oneSignal:OneSignal
  ) {
    this.initializeApp();
  }

   initializeApp() {
    
     this.platform.ready().then(() => {
      this.hideSplashScreen();
     
      //on reconnect
      this.network.onConnect().subscribe(() => {
        try {
         // this.networkToast.hide();
          window.location.reload();
        } catch(e) {}
      });      
      //if no internet
      if (this.network.type == 'none' ){
          try {
            //this.networkToast.hide();
          } catch(e) {}    
        this.statusBar.styleDefault();
        this.showAlert();
      }
      //if has internet
      else{
        // watch network for a disconnect
        this.network.onDisconnect().subscribe(() => {
          try {
            //this.networkToast.hide();
          } catch(e) {}    
          this.showAlert();
        });    
        console.log("here hide splash");
        this.configoneSignal().then(() => 
          this.hideSplashScreen()
        )
       
      }
    }) 
 
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

   private hideSplashScreen(){
    return new Promise(resolve => {
      console.log('hideSplashScreen');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      resolve('this.splashScreen');
    });
  }



}
