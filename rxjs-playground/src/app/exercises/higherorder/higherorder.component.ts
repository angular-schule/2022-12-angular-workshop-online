import { Component } from '@angular/core';
import { Subject, ReplaySubject, Observable, map, mergeAll, mergeMap, concatMap, switchMap, exhaustMap, of, timer } from 'rxjs';

import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'rxw-higherorder',
  templateUrl: './higherorder.component.html',
})
export class HigherorderComponent {

  logStream$ = new ReplaySubject<string>();
  source$ = new Subject<string>();

  result$: Observable<string>;

  constructor(private es: ExerciseService) {

    /**
     * Löse für jedes Tier-Event im source$-Stream ein Echo aus.
     * Die Methode `this.es.echo()` gibt ein Observable zurück, das Echos produziert.
     * Probiere aus, wie sich concatMap, mergeMap, switchMap und exhaustMap unterschiedlich verhalten.
     *
     * Quelle: this.source$
     * Ziel:   this.result$
     */

    /**************!!**************/

    this.result$ = this.source$.pipe(
      exhaustMap(tier => this.es.echo(tier)),
    );


    /*const foo = of(1,2,3,4,5,6).pipe(
      mergeMap(zahl => timer(2000).pipe(map(() => zahl.toString(10))))
    )*/

    /**************!!**************/

    this.source$.subscribe(value => this.logStream$.next(`SOURCE: ${value}`));
    this.result$.subscribe(value => this.logStream$.next(`🚀 ${value}`));
  }

  echoTest() {
    this.es.echo('TEST').subscribe(value => this.logStream$.next(value));
  }

  sendValue(value: string) {
    this.source$.next(value);
  }

}
