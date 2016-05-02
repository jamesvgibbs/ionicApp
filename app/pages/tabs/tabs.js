import {Page, NavParams} from 'ionic-angular';
import {MapPage} from '../map/map';
import {AboutPage} from '../about/about';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  static get parameters() {
    return [[NavParams]];
  }

  constructor(navParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;

    this.tab1Root = MapPage;
    this.tab2Root = AboutPage;
  }
}