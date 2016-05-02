import {App, IonicApp, Platform, Events} from 'ionic-angular';
import {Device} from 'ionic-native';
import {StatusBar} from 'ionic-native';
//import {TabsPage} from './pages/tabs/tabs'
import {MapPage} from './pages/map/map';
import {RegisterDevicePage} from './pages/register-device/register-device';
import {AboutPage} from './pages/about/about';
import {LoginPage} from './pages/login/login';
import {SignupPage} from './pages/signup/signup'
import {SecurityService} from './providers/security/security';
import {TokenService} from './providers/token/token';
import {ConnectivityService} from './providers/connectivity-service/connectivity-service';

@App({
  templateUrl: 'build/app.html',
  providers: [ConnectivityService, SecurityService, TokenService],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
  static get parameters() {
    return [[IonicApp], [Platform], [Events], [SecurityService], [TokenService]];
  }

  constructor(app, platform, events, security, token) {
    // set up our app
    this.app = app;
    this.platform = platform;
    this.events = events;
    this.securitySvc = security;
    this.tokenSvc = token;
    this.loggedIn = false;
    this.initializeApp();
    
    this.rootPage = LoginPage;
    
    this.appPages = [
      { title: 'Map', component: MapPage, index: 0, icon: 'map' },
      //{ title: 'Register', component: RegisterDevicePage, index: 1, icon: 'map' },
      { title: 'About', component: AboutPage, index: 2, icon: 'information-circle' },
    ];
    
    this.loggedInPages = [
      { title: 'Logout', component: MapPage, icon: 'log-out' }
    ];

    this.loggedOutPages = [
      { title: 'Login', component: LoginPage, icon: 'log-in' },
      { title: 'Signup', component: SignupPage, icon: 'person-add' }
    ];
    
    let jwt = localStorage.getItem('token');
    this.loggedIn = !this.tokenSvc.isTokenExpired(jwt);
    console.log(this.loggedIn);

    this.listenToLoginEvents();
    
    if(this.loggedIn){
      this.events.publish('user:login');
      this.rootPage = MapPage;
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      
      console.log('Device UUID is: ' + Device.device.uuid);
      
    });
  }
  
  openPage(page) {
    let nav = this.app.getComponent('nav');

    if (page.index) {
      nav.setRoot(page.component, {tabIndex: page.index});
    } else {
      nav.setRoot(page.component);
    }

    if (page.title === 'Logout') {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.securitySvc.logout();
      }, 1000);
    }
  }
  
  listenToLoginEvents() {
    console.log('listenToLoginEvents');
    this.events.subscribe('user:login', () => {
      console.log('user:login');
      this.loggedIn = true;
    });

    this.events.subscribe('user:signup', () => {
      console.log('user:signup');
      this.loggedIn = true;
    });

    this.events.subscribe('user:logout', () => {
      console.log('user:logout');
      this.loggedIn = false;
    });
  }
}
