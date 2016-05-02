import {Directive} from 'angular2/core';

/*
  Generated class for the PointMarker directive.

  See https://angular.io/docs/ts/latest/api/core/DirectiveMetadata-class.html
  for more info on Angular 2 Directives.
*/
@Directive({
  selector: '[point-marker]' // Attribute selector
})
export class PointMarker {
  constructor() {
    console.log('Hello World');
  }
}
