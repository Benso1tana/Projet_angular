import { Component, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { flickrSearch } from 'src/app/flickrAPI';
import { Options, FilterValue, SizeValue, ColorValue, OrientationValue, SafeSearchValue } from 'src/app/modules/modules';

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

  filters: Options = {};
  
  convertToColorValue(value: string): ColorValue {
    return ['red', 'green', 'blue', 'yellow', 'purple', 'white', 'black', 'gray'].includes(value) ? value as ColorValue : 'white';
  }

  setFilter(filterName: keyof Options, value: FilterValue) {
    switch(filterName) {
      case 'size':
        this.filters.size = value as SizeValue;
        break;
      case 'color':
        if (typeof value === 'string' && ['red', 'green', 'blue', 'yellow', 'purple', 'white', 'black', 'gray'].includes(value)) {
          this.filters.color = value as ColorValue;
        }
        break;
      case 'orientation':
        this.filters.orientation = value as OrientationValue;
        break;
      case 'safe_search':
        this.filters.safe_search = value as SafeSearchValue;
        break;
      case 'minDate':
      case 'maxDate':
        this.filters[filterName] = value as Date;
        break;
      default:
        throw new Error(`Invalid filter name: ${filterName}`);
    }
  }

  onSearch() {
    flickrSearch(this.searchVal, this.filters)
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
