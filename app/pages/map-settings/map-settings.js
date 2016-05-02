import {Page, NavParams, ViewController} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/map-settings/map-settings.html',
})
export class MapSettingsPage {
  static get parameters() {
    return [[NavParams], [ViewController]];
  }

  constructor(nav, viewCtrl) {
    this.nav = nav;
    this.viewCtrl = viewCtrl;
    
    // passed in array of tracks that should be excluded (unchecked)
    this.passedInParams = this.nav.data;
    this.activeOrders = false;
    this.styled = true;
  }
  
  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
  
  applyFilters() {
    console.log('active: ' + this.activeOrders);
    console.log('styled: ' + this.styled);
    this.dismiss(this.passedInParams);
  }
}
