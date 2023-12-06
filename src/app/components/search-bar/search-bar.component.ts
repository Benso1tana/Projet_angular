import { Component, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { flickrSearch } from 'src/app/flickrAPI';
import { Options } from 'src/app/modules/modules';

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
    id : string;
  }>> = new EventEmitter<Array<{
    src: string;
    title: string;
    description: string;
    id : string  ; 
  }>>();

  onSearch() {

    const myOptions : Options  = {
      size: 'large',
      color: 'black',
      orientation: undefined,
      minDate: undefined,
      maxDate: undefined,
      safe_search : '1'
    };
    flickrSearch(this.searchVal, myOptions)
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
    const myOptions : Options  = {
      size: 'small',
      color: 'black',
      orientation: 'landscape',
      minDate: undefined,
      maxDate: undefined,
      safe_search : '1'
    };

    flickrSearch(this.searchVal, myOptions)
    .then((res) => {
      console.log('Received search data:', res);
     this.onSearch()
    })
    .catch((error) => {
      console.error('Error fetching search data:', error);
    });
   
    
    
  }
}
