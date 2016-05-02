import {Page, NavController} from 'ionic-angular';
import {IndexPage} from '../index/index';

@Page({
    templateUrl: 'build/pages/welcome/welcome.html'
})
export class WelcomePage {
    
   static get parameters() {
    return [[NavController]];
   }
  
   constructor(nav) {
        this.nav = nav;
        this.slides = [
            {
                title: "Welcome to DigiTrac!",
                description: "<b>DigiTrac</b> provides a number of useful tools to help you find your company's assets.",
                image: "img/ica-slidebox-img-1.png",
            },
            {
                title: "What is DigiTrac?",
                description: "<b>DigiTrac</b> is intended to be a simple to use mobile asset tracking application. The app will not only show you where you are, but will show you where other assets are near you.",
                image: "img/ica-slidebox-img-1.png",
            }
        ];
        
        let skipped = localStorage.getItem('skipped');
        let continued = localStorage.getItem('continue');
        
        // if(skipped || continued){
        //     this.nav.setRoot(IndexPage);
        // }
   }
   
   skip(){
       localStorage.setItem('skipped', true);
       this.nav.setRoot(IndexPage);
   }
   
   continue(){
       localStorage.setItem('continue', true);
       this.nav.setRoot(IndexPage);
   }
}