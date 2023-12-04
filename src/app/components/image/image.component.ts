import { Component, Input } from '@angular/core';
import { getPhotoDetails } from 'src/app/flickrAPI';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent {
  @Input() image: {
    src: string;
    title: string;
    description: string;
  } = {
    src: '',
    title: '',
    description: ''
  };



  print(){
    alert(this.image.src) ;
    getPhotoDetails("5227554690") ; 
  }
}


