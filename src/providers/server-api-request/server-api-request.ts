import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

/* providers */
import { Globals } from '../globals/globals';

declare var cordova: any;

@Injectable()
export class ServerApiRequest {

  lastImage: string = null;
  constructor(public http: Http, private globals: Globals) {
    
  }


  setUserData(userData){
    let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		});
		let options = new RequestOptions({
			headers: headers
    });

    let body = "method=setUserData&userData="+JSON.stringify(userData);
              
    return this.http.post(this.globals.apiUrl, body, options)
    .map(this.extrectData)
    .do(this.logResponse)
    .catch(this.catchError);

  }

  private catchError(error: Response | any){
    return Observable.throw(error.json().error || 'Server error');
  }

  private logResponse(res: Response){
  }

  private extrectData(res: Response){
    return res.json();
  }

  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  
}
