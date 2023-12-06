import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  @Input() data: Array<{
    src: string;
    title: string;
    description: string;
    id : string
  }> = [];

  ngOnChanges() {
    console.log('Received data in GalleryComponent:', this.data);
  }



}

