import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController, ModalController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Auth } from './auth.model';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
loadAuth: Auth[];
private authSub: Subscription;
x: number;
isLoading = false;
isLoging = false;


  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: LoadingController,
    public alertController: AlertController,
    private modalController: ModalController,
    private navCtrl: NavController,

    private storage: NativeStorage,
    public loadingController: LoadingController
       ) { }

  ngOnInit() {
    // this.authSub = this.authService.auth.subscribe(auth => {
    //   this.loadAuth = auth;
    // })
  }

// onLogin() {

 
//  }
// dismissLogin() {
//   this.modalController.dismiss();
// }

//  ionViewWillEnter() {
//   this.authService.fetchHome().subscribe();
// }

 onSubmit(form: NgForm) {
//console.log(form);
if (!form.valid) {
  return;
}
 const email = form.value.email;
 const password = form.value.password;
// console.log(user, password);
// for ( this.x = 0; this.x < this.loadAuth.length; this.x++ ){
//   console.log(this.x);
//   if (user === this.loadAuth[this.x].user && password === this.loadAuth[this.x].password) {
    
//     this.isLoading = true;
//     // this.authService.login();
  
//     this.loadingCtrl.create({keyboardClose: true, message: 'logging in..'})
//     .then(loadingEl => {
//       loadingEl.present();
//       setTimeout(() => {
//         this.isLoading = false;
//         loadingEl.dismiss();
//         this.router.navigateByUrl('/salary');
//       }, 1500);
//     });

    
//   }
  // if else (user !== this.loadAuth[this.x].user || password !== this.loadAuth[this.x].password){
  //   console.log('hello password');
    
  //   const alert = this.alertController.create({
  //     message: 'Should be a valid User Name',
  //     subHeader: 'Notification',
  //     buttons: ['Calcle']}).then( alert=> alert.present());
    
  // }


this.authService.login(email, password).subscribe(
    data => {
      console.log(data.access_token);
     
     // this.storage.setItem('token', data.access_token);
      this.isLoading = true;
      this.loadingController.create({ keyboardClose: true, message: 'Logging in...'})
      .then(loadingEl => {
        loadingEl.present();
        setTimeout(() => {
          this.isLoading = false;
          
         // this.dismissLogin();
         localStorage.setItem('token', data.access_token);
          this.navCtrl.navigateRoot('/salary');
          loadingEl.dismiss();
        }, 1500);
      });
   
   
     
      
    },
    error => {
          this.alertController.create({ 
          message: "cheke your email and password",
          buttons: ['OK']}).then(loadingEl => loadingEl.present());
         //console.log(error);

       
      
    }
    // () => {
    //   this.dismissLogin();
    //   this.navCtrl.navigateRoot('/salary');
    // }
  );


 }

}
