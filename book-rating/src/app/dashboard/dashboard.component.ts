import { Component } from '@angular/core';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

}


/*
TODO:
- Datenmodell
- Daten
- Anzeige
*/


class BookC {
  rating: number = 5;
  constructor(public isbn: string, public title: string) {}

  rateUp() {
    this.rating++;
  }
}

const myBook = new BookC('123', 'Angular');


////////////////////


interface BookI {
  isbn: string;
  title: string;
  rating: number;
}

const book: BookI = {
  isbn: '123',
  title: 'Angular',
  rating: 5
};




