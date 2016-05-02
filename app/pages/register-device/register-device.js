import {Page, NavController} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/register-device/register-device.html',
})
export class RegisterDevicePage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
  }
}
