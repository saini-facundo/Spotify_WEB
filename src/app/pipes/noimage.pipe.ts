import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform(images: any[]): string {
    let image = "";
    if (images.length == 0 || !images[0].url) {
      image = '../../assets/noimage.png';
    } else {
      image = images[0].url;
    }
    return image;
  }

}
