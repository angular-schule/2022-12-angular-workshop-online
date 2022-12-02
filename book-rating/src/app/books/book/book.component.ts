import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'br-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent {
  // Daten dürfen von der Elternkomponente in dieses Property hineinfließen
  @Input() book?: Book;
  @Input() minRating = 0;
  @Input() maxRating = 10;

  // Daten fließen von der Kindkomponente zur Elternkomponente
  @Output() rateUp = new EventEmitter<Book>();
  @Output() rateDown = new EventEmitter<Book>();

  doRateUp() {
    this.rateUp.emit(this.book);
  }

  doRateDown() {
    this.rateDown.emit(this.book);
  }

  log() {
    // console.log('CD', Date.now());
  }
}
