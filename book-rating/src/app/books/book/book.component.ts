import { Component, Input } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'br-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {
  // Daten dürfen von der Elternkomponente in dieses Property hineinfließen
  @Input() book?: Book;
}
