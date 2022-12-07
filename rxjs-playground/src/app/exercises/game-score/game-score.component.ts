import { Component } from '@angular/core';
import { Subject, ReplaySubject, scan, reduce, startWith, of } from 'rxjs';

@Component({
  selector: 'rxw-game-score',
  templateUrl: './game-score.component.html',
})
export class GameScoreComponent {

  logStream$ = new ReplaySubject<string | number>();
  score$ = new Subject<number>();

  currentScore = 0;

  constructor() {
    /**
     * Wir entwickeln ein spannendes Browser-Spiel!
     * Jetzt fehlt nur noch der Code, um den aktuellen Punktestand zu ermitteln ...
     */

    /******************************/
    // [1,2,3,4,5].reduce((acc, item) => acc + item); // 15

    this.score$.pipe(
      startWith(0),
      scan((acc, item) => acc + item, 100),
    ).subscribe(score => this.currentScore = score);


    /******************************/

    // Exkurs in Redux-Pattern
    of(
      'SETCITYLEIPZIG', // { type: 'Set City', data: 'Leipzig' }
      'SETNAMEKLAUS',
      'SETCITYHAMBURG',
      'SETLANGDE',
      'FOOBAR',
    ).pipe(
      scan((state, msg) => {
        switch (msg) {
          case 'SETCITYLEIPZIG': return { ...state, city: 'Leipzig' };
          case 'SETCITYHAMBURG': return { ...state, city: 'Hamburg' };
          case 'SETNAMEKLAUS': return { ...state, name: 'Klaus' };
          case 'SETNAMELISA': return { ...state, name: 'Lisa' };
          case 'SETLANGDE': return { ...state, lang: 'deutsch' };
          case 'SETLANGEN': return { ...state, lang: 'englisch' };
          default: return state;
        }
      }, { name: 'Frank', city: 'München', lang: 'de-CH' })
    ).subscribe(console.log)



    /******************************/

    this.score$.subscribe({
      next: e => this.logStream$.next(e),
      complete: () => this.logStream$.next('✅ COMPLETE')
    });
  }

  finishGame() {
    this.score$.complete();
  }

  addScore(amount: number) {
    this.score$.next(amount);
  }

}
