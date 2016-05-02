import {Injectable} from 'angular2/core';

@Injectable()
export class TokenService {
  // static get parameters(){
  //   return [[Http]]
  // }  

  constructor() {
    
  }

  urlBase64Decode(str) {
      var output = str.replace(/-/g, '+').replace(/_/g, '/');
      switch (output.length % 4) {
          case 0: { break; }
          case 2: { output += '=='; break; }
          case 3: { output += '='; break; }
          default: {
              throw 'Illegal base64url string!';
          }
      }
      
      return decodeURIComponent(escape(window.atob(output))); 
  }
  
  decodeToken(token) {
      var parts = token.split('.');
      var decoded = this.urlBase64Decode(parts[1]);

      if (parts.length !== 3) {
          throw new Error('JWT must have 3 parts');
      }
      
      if (!decoded) {
          throw new Error('Cannot decode the token');
      }
      
      return (typeof String(decoded)) ? JSON.parse(decoded) : decoded;
  }
  
  getTokenExpirationDate(token) {
      var date = new Date(0); // The 0 here is the key, which sets the date to the epoch
      var decoded = this.decodeToken(token);

      if (typeof decoded.exp === 'undefined') {
          return null;
      }

      date.setUTCSeconds(decoded.exp);

      return date;
  }
  
  isTokenExpired(token, offsetSeconds) {
      var expireDate = this.getTokenExpirationDate(token);
      offsetSeconds = offsetSeconds || 0;
      if (expireDate) {
          return !(expireDate.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
      }
      return false;
  }
}

