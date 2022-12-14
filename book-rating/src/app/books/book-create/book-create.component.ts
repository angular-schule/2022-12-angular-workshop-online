import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent {
  bookForm = new FormGroup({
    isbn: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
        Validators.minLength(10),
        Validators.maxLength(13),
      ]
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(50)
      ]
    }),
    description: new FormControl('', { nonNullable: true }),
    rating: new FormControl(1, {
      nonNullable: true,
      validators: [
        Validators.min(1),
        Validators.max(5)
      ]
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: Validators.min(0)
    }),
    /*authors: new FormArray([
      new FormControl('', { nonNullable: true }),
      new FormControl('', { nonNullable: true }),
      new FormControl('', { nonNullable: true }),
    ])*/
  });


  constructor(private bs: BookStoreService, private router: Router) {}

  isInvalid(controlName: string): boolean {
    const control = this.bookForm.get(controlName);
    // return control ? control.touched && control.invalid : false;
    // return control?.touched === false && control?.invalid === false;
    // return !!(control?.touched && control?.invalid);
    // return (control?.touched && control?.invalid) ?? false;
    return !!control && control.touched && control.invalid;
  }

  hasError(controlName: string, errorCode: string): boolean {
    const control = this.bookForm.get(controlName);
    // return control && errorCode ? control.getError(errorCode) : false;
    return !!control && control.touched && control.hasError(errorCode);
  }

  submitForm() {
    const book: Book = this.bookForm.getRawValue();
    this.bs.create(book).subscribe(receivedBook => {
      this.router.navigate(['/books', receivedBook.isbn]); // Detailseite
      // this.router.navigateByUrl('/books'); // Dashboard
    });
  }
}

/* TODO
- Validierung
- Feedback
  - "Die ISBN ist ung??ltig."
  - "Die ISBN ist zu kurz."
- Button
- abschicken
- HTTP
- bei Erfolg:
  - Redirect zum Dashboard oder Detailseite
  - Meldung
  - Formular zur??cksetzen

*/
