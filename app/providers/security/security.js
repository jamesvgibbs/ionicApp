import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Alert, Events} from 'ionic-angular';

@Injectable()
export class SecurityService {
  static get parameters(){
    return [[Http], [Events]]
  }  

  constructor(http, events) {
    this.http = http;
    this.api = 'https://api.digitalfleet.net';
    this.data = null;
    this.events = events;
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
        this.events.publish('user:login');
        this.nav.setRoot(MapPage);
        //if not then show them the menu
    }
  }
  
  showError(error){
      let alert = Alert.create({
            title: 'Login Error',
            subTitle: error._body,
            buttons: ['Dismiss']
        });
        //this.nav.present(alert);
  }
  
  login(user){
    var postData = JSON.stringify({
      UserName: user.username.toLowerCase(), 
      Email: user.username.toLowerCase(), 
      Password: user.password, 
      TenantName: user.company.toLowerCase()
    });
    var options = {
      headers: { 'Content-Type': ['application/json'] }
    };
    this.http.post(this.api + '/security/login', postData, options)
      .subscribe(
          data => this.saveJWT(data._body),
          err => this.showError(err),
          () => console.log('Authentication Complete')
      );
  }
  
  logout(){
    localStorage.setItem('token', null);
    this.events.publish('user:logout');
  }
}

