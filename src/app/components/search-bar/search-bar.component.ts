import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  
})

export class SearchBarComponent {
  isSearchBarAtTop:boolean = false;

  toggleSearchBarPosition() {
    this.isSearchBarAtTop = !this.isSearchBarAtTop;
    console.log("hey");
    
  }
}
