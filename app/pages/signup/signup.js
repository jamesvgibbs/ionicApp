import {Page, NavController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {SecurityService} from '../../providers/security/security';

@Page({
  templateUrl: 'build/pages/signup/signup.html'
})
export class SignupPage {
  static get parameters() {
    return [[NavController], [SecurityService]];
  }

  constructor(nav, security) {
    this.nav = nav;
    this.securitySvc = security;

    this.signup = {};
    this.submitted = false;
  }

  onSignup(form) {
    this.submitted = true;

    console.log(form);

    if (form.valid) {
      this.userData.signup();
      this.nav.push(TabsPage);
    }
  }
}