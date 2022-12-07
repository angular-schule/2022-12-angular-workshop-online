import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';
import { loadBooks } from '../store/book.actions';
import { selectBooks, selectBooksLoading } from '../store/book.selectors';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  books: Book[] = [];

  loading$ = this.store.select(selectBooksLoading);

  constructor(private rs: BookRatingService, private bs: BookStoreService, private store: Store) {
    this.store.dispatch(loadBooks());

    this.store.select(selectBooks).subscribe(books => {
      this.books = books;
    })
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
