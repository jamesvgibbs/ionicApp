import {Page, Alert, NavController} from 'ionic-angular';
import {Http, Headers} from 'angular2/http';
import {WelcomePage} from '../welcome/welcome';

@Page({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
    
  static get parameters() {
    return [[NavController], [Http]];
  }
    
  constructor(nav, http) {
      this.user = {
          company: null,
          username: null,
          password: null
     };
     this.nav = nav;
     this.api = 'https://api.digitalfleet.net';
     this.http = http;
     
     this.alreadyLogedIn();
  }
  
  alreadyLogedIn(){
      //if already have a token validate and move on
      let token = localStorage.getItem('token');
      if(token){
          this.validateToken(token);
      }
  }
  
  validateToken(token){
    var postData = JSON.stringify(token);
    var options = {
        headers: { 'Content-Type': ['application/json'] }
    };
    this.http.post(this.api + '/security/validatetoken', postData, options)
        .subscribe(
            data => this.validationResponse(data._body),
            err => this.showError(err),
            () => console.log('Validation Complete')
        );
  }
  
  validationResponse(dataBody){
      let response = JSON.parse(dataBody);
      if(response.isvalid){
          this.saveJWT(response.token);
      }
  }
  
  saveJWT(token){
    if(token) {
        token = token.replace(/\"/g, '');
        localStorage.setItem('token', token);
        //if this is the first time show them the welcome screen
        this.nav.setRoot(WelcomePage);
        //if not then show them the menu
    }
  }
  
  showError(error){
      let alert = Alert.create({
            title: 'Login Error',
            subTitle: error._body,
            buttons: ['Dismiss']
        });
        this.nav.present(alert);
  }
  
  login(){
      if(this.user.company){
          if(this.user.username){
              if(this.user.password){
                  var postData = JSON.stringify({UserName: this.user.username.toLowerCase(), Email: this.user.username.toLowerCase(), Password: this.user.password, TenantName: this.user.company.toLowerCase()});
                  var options = {
                    headers: { 'Content-Type': ['application/json'] }
                  };
                  this.http.post(this.api + '/security/login', postData, options)
                    .subscribe(
                        data => this.saveJWT(data._body),
                        err => this.showError(err),
                        () => console.log('Authentication Complete')
                    );
    
              }else{
                let alert = Alert.create({
                    title: 'Missing Password',
                    subTitle: 'Please provide a password to continue.',
                    buttons: ['Dismiss']
                });
                this.nav.present(alert);
              }
          }else{
            let alert = Alert.create({
                title: 'Missing Username',
                subTitle: 'Please provide a username to continue.',
                buttons: ['Dismiss']
            });
            this.nav.present(alert);
          }
      }else{
        let alert = Alert.create({
            title: 'Missing Company',
            subTitle: 'Please provide a company name to continue.',
            buttons: ['Dismiss']
        });
        this.nav.present(alert);
      }
  }
}
