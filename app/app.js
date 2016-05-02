import {App, IonicApp, Platform, MenuController} from 'ionic-angular';
import {Device} from 'ionic-native';
import {StatusBar} from 'ionic-native';
import {MapPage} from './pages/map/map';
import {LoginPage} from './pages/login/login';
import {ListPage} from './pages/list/list';
import {ConnectivityService} from './providers/connectivity-service/connectivity-service';

@App({
  templateUrl: 'build/app.html',
  providers: [ConnectivityService],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
  static get parameters() {
    return [[IonicApp], [Platform], [MenuController]];
  }

  constructor(app, platform, menu) {
    // set up our app
    this.app = app;
    this.platform = platform;
    this.menu = menu;
    this.initializeApp();
    this.isDeviceReady();

    // set our app's pages
    this.pages = [
      { title: 'Map', component: MapPage },
      { title: 'My First List', component: ListPage }
    ];

    // make HelloIonicPage the root (or first) page
    //this.rootPage = HelloIonicPage;
    this.rootPage = LoginPage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      
      
    });
  }
  
  isDeviceReady(){
    console.log('before ready');
    window.addEventListener('deviceready', function () {
      console.log('ready');
      this.device = Device.device();
      console.log('Got device', this.device);
      // // 'configure' calls 'start' internally
      // $cordovaBackgroundGeolocation.configure(options)
      // .then(
      //   null, // Background never resolves
      //   function (err) { // error callback
      //     console.error(err);
      //   },
      //   function (location) { // notify callback
      //     console.log(location);
      //   });

      // $scope.stopBackgroundGeolocation = function () {
      //   $cordovaBackgroundGeolocation.stop();
      // };

    }, false);
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}
