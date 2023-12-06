import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { getPhotoDetails } from 'src/app/flickrAPI';
import { ImageDetailsDialogComponent } from 'src/app/image-details-dialog/image-details-dialog.component';

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
    id : string ; 
  } = {
    src: '',
    title: '',
    description: '',
    id: ''
  };

  
  constructor(public dialog: MatDialog) {}
  seeMore() {
    getPhotoDetails(this.image.id).then(details => {
      this.dialog.open(ImageDetailsDialogComponent, {
        data: {
          details: details, 
          image: this.image ,
          comments: details.comments
        }
      });
    }).catch(error => {
      console.error('Error fetching photo details:', error);
      
    });
  }

  print(){
    alert(this.image.src) ;
    getPhotoDetails(this.image.id) ; 
  }
}


