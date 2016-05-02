import {Directive} from 'angular2/core';

/*
  Generated class for the OrderMarker directive.

  See https://angular.io/docs/ts/latest/api/core/DirectiveMetadata-class.html
  for more info on Angular 2 Directives.
*/
@Directive({
  selector: '[order-marker]' // Attribute selector
})
export class OrderMarker {
  constructor() {
    console.log('Hello World');
  }
}
