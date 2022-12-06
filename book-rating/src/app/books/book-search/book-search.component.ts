import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'br-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent {
  searchControl = new FormControl('', { nonNullable: true });

  constructor() {
    this.searchControl.valueChanges.subscribe(e => {
      console.log(e);
    });
  }
}
