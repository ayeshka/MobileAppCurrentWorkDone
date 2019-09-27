import { Component } from '@angular/core';

import { Platform,Events } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Plugins, Capacitor } from '@capacitor/core';
import { from, Subscription } from 'rxjs';
import { ProfileService } from './profile/profile.service';
import { UserDetails } from './profile/profile.model';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  getimages: string;
  UserName: string;
  imageSub: Subscription;
  constructor(
    private platform: Platform,
    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar,
    private router: Router,
    private authServe: AuthService,
    private profileService: ProfileService,
    public events: Events
  ) {
    events.subscribe('user', () => {
      this.Setimage();
    });
    this.initializeApp();
    
  }

  initializeApp() {
    this.profileService.getimage().subscribe(data => {this.getimages = data
    console.log(data) });
  this.imageSub =   this.profileService.fatch().subscribe(data => this.UserName = data[3]  );
    this.platform.ready().then(() => {
        if (Capacitor.isPluginAvailable('SplashScreen')) {
          Plugins.SplashScreen.hide();
        }
    });
  }

  getimage(image: string){
   console.log(image);
  
  }

  Setimage() {
    console.log("logged in");
    this.profileService.getimage().subscribe(data => {this.getimages = data });
    }

  onLogout() {
    this.authServe.logout();
    this.router.navigateByUrl('/auth');
  }
}
