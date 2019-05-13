import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';


@Injectable()
export class NotificationOpenedProvider {

  public notificationData$ = new BehaviorSubject<any>(null);

  constructor() {

  }

  pushNotificationData(pushData){
    this.notificationData$.next(pushData);
  }

  pushNotificationDataClear(){
    this.notificationData$.next(null);    
  }

}
