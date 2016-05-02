import {Injectable} from 'angular2/core';
import {Platform} from 'ionic-angular';

@Injectable()
export class ConnectivityService {
  static get parameters(){
    return [[Platform]]
  }  

  constructor(platform) {
    this.platform = platform;
    this.onDevice = this.platform.is('ios') || this.platform.is('android');
  }

  isOnline() {
    if(this.onDevice && navigator.connection){
      let networkState = navigator.connection.type;
      return networkState !== Connection.NONE;
    } else {
      return navigator.onLine;      
    }
  }
 
  isOffline(){
    if(this.onDevice && navigator.connection){
      let networkState = navigator.connection.type;
      return networkState === Connection.NONE;
    } else {
      return !navigator.onLine;     
    }
  }
}

