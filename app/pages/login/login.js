import {Page, Alert, NavController} from 'ionic-angular';
import {MapPage} from '../map/map';
import {SignupPage} from '../signup/signup';
import {SecurityService} from '../../providers/security/security';

@Page({
  templateUrl: 'build/pages/login/login.html',
  providers: [SecurityService],
})
export class LoginPage {
    
  static get parameters() {
    return [[NavController], [SecurityService]];
  }
    
  constructor(nav, security) {
     this.login = {};
     this.nav = nav;
     this.securitySvc = security;
  }
  
  onLogin(form){
    if (form.valid) {
      this.securitySvc.login(this.login);  
      this.nav.push(MapPage);
    }
  }
  
  onSignup() {
    this.nav.push(SignupPage);
  }
}
