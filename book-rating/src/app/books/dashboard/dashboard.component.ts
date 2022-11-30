import { Component } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  books: Book[] = [];

  constructor() {
    this.books = [
      {
        isbn: '123',
        title: 'Angular',
        rating: 5,
        price: 42.9,
        description: 'Das große Praxisbuch'
      },
      {
        isbn: '456',
        title: 'Vue.js',
        rating: 3,
        price: 36.9,
        description: 'Das grüne Framework'
      }
    ];
  }
}

/*
TODO:
- Datenmodell
- Daten
- Anzeige
*/



