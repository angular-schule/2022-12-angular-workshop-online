import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' }, // "pathMatch: full" immer bei Weiterleitung vom leeren Pfad
  {
    path: 'books',
    loadChildren: () => import('./books/books.module').then(m => m.BooksModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
