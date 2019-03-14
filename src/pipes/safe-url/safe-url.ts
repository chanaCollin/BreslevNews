import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the SafeHtmlPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'safeUrl',
})
export class safeUrllPipe implements PipeTransform {
  constructor(private sanitizer:DomSanitizer){}
  transform(url) {
    console.log("url: "+url);
    return this.sanitizer.bypassSecurityTrustHtml(url);
  }
}
