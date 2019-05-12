import { Injectable } from '@angular/core';


@Injectable()
export class Globals {
  public siteUrl: string = "https://www.breslev.news/";
  public apiUrl: string  = "https://www.breslev.news/sc-api/";
  
  public googleAnalyticsTrackingId: string = '';

  constructor() {
    
  }

}
