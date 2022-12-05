import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        // BRS ersetzen: Immer wenn also BRS angefordert wird,
        // wird stattdessen der Stub ausgeliefert
        {
          provide: BookRatingService,
          useValue: { // Stub
            rateUp: (b: Book) => b
          }
        },
        {
          provide: BookStoreService,
          useValue: {
            getAll: () => of([])
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance; // TS-Instanz
    // fixture.nativeElement.querySelector() // DOM-Element
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service.rateUp() for doRateUp()', () => {
    // Arrange
    // BRS anfordern – das ist in Wahrheit aber unser Stub.
    const service = TestBed.inject(BookRatingService);

    // service.rateUp überwachen, originale Methode des Stubs aber weiterhin verwenden
    // Mock
    spyOn(service, 'rateUp').and.callThrough(); // returnValue() // callFake()

    // Act
    // Dummy-Buch an doRateUp übergeben
    const book = { isbn: '123' } as Book; // Type Assertion (Achtung!)
    component.doRateUp(book);

    // Assert
    // prüfen, ob Methode aufgerufen wurde
    expect(service.rateUp).toHaveBeenCalled();
    expect(service.rateUp).toHaveBeenCalledWith(book);
    expect(service.rateUp).toHaveBeenCalledTimes(1);
    expect(service.rateUp).toHaveBeenCalledOnceWith(book);
  });
});
