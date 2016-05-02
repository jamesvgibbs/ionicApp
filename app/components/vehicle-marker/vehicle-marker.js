import {Directive} from 'angular2/core';

/*
  Generated class for the VehicleMarker directive.

  See https://angular.io/docs/ts/latest/api/core/DirectiveMetadata-class.html
  for more info on Angular 2 Directives.
*/
@Directive({
  selector: '[vehicle-marker]' // Attribute selector
})
export class VehicleMarker {
  constructor() {
    console.log('Hello World');
  }
}
