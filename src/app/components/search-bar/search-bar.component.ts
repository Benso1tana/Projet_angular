import { Component, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { flickrSearch } from 'src/app/flickrAPI';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  
})

export class SearchBarComponent {
  isSearchBarAtTop:boolean = false;
  searchVal : string   = ''; 



  @Output() searchData: EventEmitter<Array<{
    src: string;
    title: string;
    description: string;
  }>> = new EventEmitter<Array<{
    src: string;
    title: string;
    description: string;
  }>>();

  onSearch() {
    flickrSearch(this.searchVal)
      .then((res) => {
        // Emit the 'searchData' event with the resolved value
        this.searchData.emit(res);
      })
      .catch((error) => {
        console.error('Error fetching search data:', error);
      });
  }

  toggleSearchBarPosition() {
    this.isSearchBarAtTop = !this.isSearchBarAtTop;
    console.log("hey");

    flickrSearch(this.searchVal)
    .then((res) => {
      console.log('Received search data:', res);
     this.onSearch()
    })
    .catch((error) => {
      console.error('Error fetching search data:', error);
    });
   
    
    
  }
}
