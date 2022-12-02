import { Component } from '@angular/core';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  books: Book[] = [];

  constructor(private rs: BookRatingService) {
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

  doRateUp(book: Book) {
    const ratedBook = this.rs.rateUp(book);
    this.updateList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.rs.rateDown(book);
    this.updateList(ratedBook);
  }

  private updateList(ratedBook: Book) {
    // [1,2,3,4,5].map(e => e * 2) // [2, 4, 6, 8, 10]
    // [1,2,3,4,5,6,7,8,9,10].filter(e => e > 5) // [6, 7, 8, 9, 10]

    this.books = this.books.map(book => {
      console.log('RB', ratedBook);
      console.log('B', book);
      if (ratedBook.isbn === book.isbn) {
        return ratedBook;
      } else {
        return book;
      }
    });
  }
}
