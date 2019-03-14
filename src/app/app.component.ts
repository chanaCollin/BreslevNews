import { Component } from '@angular/core';

import { Platform, ToastController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Toast } from '@ionic-native/toast/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  networkToast: Toast;


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public network: Network,
    public toastCtrl :ToastController
  ) {
    this.initializeApp();
  }

   initializeApp() {
    /* this.platform.ready().then(() => {
       this.statusBar.styleDefault();
       this.splashScreen.hide();
     });*/
     this.platform.ready().then(() => {

       //on reconnect
       this.network.onConnect().subscribe(() => {
         try {
           this.networkToast.hide();
           window.location.reload();
         } catch(e) {
 
         }
       });      
 
       //if no internet
       if (this.network.type == 'none' ){
         try {
           this.networkToast.hide();
         } catch(e) {
 
        }    
         this.statusBar.styleDefault();
         console.log("no internet");
         /*this.networkToast = this.toastCtrl.create({
           message: 'No internet connection',
           position: 'top',
           showCloseButton: true,
           closeButtonText: 'close',
           cssClass: "network-toast" 
         });
         this.networkToast.present();      */
         this.networkToast.show(`I'm a toast`, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
       }
       //if has internet
       else{
         console.log("internet");
         // watch network for a disconnect
         this.network.onDisconnect().subscribe(() => {
           try {
             this.networkToast.hide();
           } catch(e) {
 
           }    
          /* this.networkToast = this.toastCtrl.create({
             message: 'No internet connection',
             position: 'top',
             showCloseButton: true,
             closeButtonText: 'close',
             cssClass: "network-toast" 
           });
           
           this.networkToast.present();      */
           this.networkToast.show(`I'm a toast`, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
          
         });    
        this.configoneSignal().then(() => 
              this.hideSplashScreen()
        )
       }
     })    
 
   }

   private configoneSignal(){
    return new Promise(resolve => {
      console.log('configoneSignal');
     /* if(this.platform.is('cordova')){        
        this.oneSignal.startInit('b4bd2a06-f33f-4e3c-8ca0-e6835295a432', '793548654523');
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
        
      }*/
      resolve('WORNING');
    });
   }

   private hideSplashScreen(){
    return new Promise(resolve => {
      console.log('hideSplashScreen');
      this.statusBar.styleDefault();
      this.splashScreen.hide();  

     /* setTimeout(() => {
        this.appLoaded = "app-did-load";
      }, 2000);   */         

      resolve('this.splashScreen');
    });
  }



}
