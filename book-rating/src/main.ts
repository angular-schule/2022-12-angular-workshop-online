import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


///////////////////

export class Customer {
  /*id: number;

  constructor(id: number) {
    this.id = id;
  }*/

  constructor(public id: number) {
  }

  foobar(foo: string): number {
    setTimeout(() => {
      console.log('Die ID ist', this.id);
    }, 2000);

    return 1;
  }
}

const myCustomer = new Customer(3);

console.log(myCustomer.foobar(''));



setTimeout(function () {
  console.log('HALLO')
}, 2000)

export const bar =  arg => { return arg + 1; }




// bar(4)
