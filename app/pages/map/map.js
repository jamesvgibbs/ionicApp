import {Page, Platform, Modal, NavController} from 'ionic-angular';
import {MapSettingsPage} from '../map-settings/map-settings';
import {ConnectivityService} from '../../providers/connectivity-service/connectivity-service';
import {SpinnerDialog} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/map/map.html'
})
export class MapPage {
  static get parameters() {
    return [[Platform], [NavController],[ConnectivityService]];
  }
  
  constructor(platform, nav, connectivityService) {
    console.log('map');
      this.platform = platform;
      this.nav = nav;
      this.connectivity = connectivityService;
      
      this.map = null;
      this.marker = null;
      this.mapInitialised = false;
      this.apiKey = null;
      this.settings = null;
      this.loadGoogleMaps();
  }
  
  loadGoogleMaps(){
    //load spinner 
    SpinnerDialog.show('Loading Map', 'Please wait while the map is loading...', true);
    var me = this;
    this.addConnectivityListeners();
    if(typeof google === 'undefined' ||  typeof google.maps === 'undefined'){
      this.disableMap();
      if(this.connectivity.isOnline()){
        window.mapInit = function loadMap (){
          me.initMap();
          me.enableMap();
        }
        
        let script = document.createElement('script');
        script.id = 'googlemaps';
        if(this.apiKey){
          script.src = 'http://maps.google.com/maps/api/js?key=' + apiKey + '&callback=mapInit';
        }else{
          script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
        }
        document.body.appendChild(script);
      }
    }else{
      if(this.connectivity.isOnline()){
        this.initMap();
        this.enableMap();
      }else{
        this.disableMap();
      }
    }
  }
  
  initMap(){
    let mapEle = document.getElementById('map_canvas');
    let mapOptions = {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(mapEle, mapOptions);
    
    this.mapInitialised = true;
    let options = {timeout: 10000, enableHighAccuracy: true};
    navigator.geolocation.getCurrentPosition(position => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      if(this.map){
        this.map.setCenter(latLng);
      }else{
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(mapEle, mapOptions);
      }
      
      this.addMarker();
      //hide spinner 
      SpinnerDialog.hide();
    }, (error) => {
      console.log(error);
      //hide spinner 
      SpinnerDialog.hide();
    }, options);
    
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
    });
  }
  
  disableMap(){
    console.log('disable map');
    //hide spinner 
    SpinnerDialog.hide();
  }
  
  enableMap(){
    console.log('enable map');
  }
  
  addConnectivityListeners(){
    var me = this;
    var onOnline = function () {
      console.log('coming online');
      setTimeout(function timeoutChecking() {
        if(typeof google === 'undefined' || typeof google.maps == 'undefined'){
          console.log('google maps not found');
          me.loadGoogleMaps();
        }else{
          console.log('google maps present');
          if(!me.mapInitialised){
            me.initMap();
          }
          me.enableMap();
        }
      }, 2000);
    };
    
    var onOffline = function () {
      me.disableMap();
    }
    
    var onDeviceReady = function(){
      console.log('device ready');
    }
    
    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);
    document.addEventListener('deviceready', onDeviceReady, false);
  }
  
  addMarker(){
    var me = this;
    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
  
    let content = '<h4>Information!</h4>';          
    this.addInfoWindow(this.marker, content);
  }
  
  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
  
    google.maps.event.addListener(marker, 'click', function(){
      infoWindow.open(this.map, marker);
    });
  }

  adjustSettings(){
    console.log('adjust settings on map');
    let modal = Modal.create(MapSettingsPage, this.settings);
    this.nav.present(modal);

    modal.onDismiss(data => {
      if (data) {
        this.settings = data;
        console.log('get new map settings' + data)
      }
    });
  }
}
