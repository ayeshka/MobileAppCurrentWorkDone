import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from './auth.model';
import { BehaviorSubject, Observable } from 'rxjs';
import {  tap, filter, map } from 'rxjs/operators';
import { Http , Headers, RequestOptions} from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController } from '@ionic/angular';
import { Body } from '@angular/http/src/body';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    
  })
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _auth = new BehaviorSubject<Auth>(null);

 private _userIsAuthenticatede = true;
 
 private token: string;

 get userIsAuthenticated() {
   return this._auth.asObservable().pipe(map(auth=>auth.access_token))
 }

//   httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json'
//   })
// };

  constructor(private http: HttpClient, private https: Http, private storage: NativeStorage) { }

  // private _auth = new BehaviorSubject<Auth[]>([]);

  // get auth() {
  //   return this._auth.asObservable();
  // }

  login(email: string, password: string)  {

    // tslint:disable-next-line: deprecation
    //let headers = new Headers();



   // headers.append('content-type', 'application/json');


   // headers.append('Accept', 'application/json');
 // tslint:disable-next-line: object-literal-shorthand
     // tslint:disable-next-line: deprecation
   // const options = new RequestOptions({ headers: headers});

    //console.log(options);


    return this.http.post<any>('http://localhost:8000/oauth/token', JSON.stringify({
      'grant_type': "password",
      'client_id': "2",
      'client_secret': "KVXO8lzLnPgHw638WY6OQOFqg1FDFtiqEBq2k38S",
    'username': email,
     'password': password
    }), httpOptions);
      // console.log(response.json()); //this is response._body

      // pipe(map(response => {response.json()}))
      
    
      
 
     
     
     
    //   .pipe(
       
    //      tap(token => {
    //        console.log(token);
    //        //console.log( JSON.stringify(token['_body']));
    //        this.storage.setItem('token', token)
    //         .then(
    //           () => {
    // console.log('Token Stored');
    //           },
    //           error => console.error('Error storing item', error)
    //         );
    //        this.token = token;
    //        this._userIsAuthenticatede  = true;
    //        return token.json();
    //      }),
    //  );
   }


  //  loging() {
  //    this._userIsAuthenticatede = true;
  //  }

   logout() {
     localStorage.clear();
     console.log(localStorage.getItem('token'));
     this._userIsAuthenticatede = false;
   }
}
