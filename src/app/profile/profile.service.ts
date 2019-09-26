import { Injectable, Output, EventEmitter } from '@angular/core';
import { UserDetails } from './profile.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


interface Userdetails {
  
  address_line_1: string;
  address_line_2: string;
  dob: string;
  first_name: string;
  id: number;
  last_name: string;
  phoneNumber: string;
  ssn: string;
}



@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  

  private _userDetails = new BehaviorSubject<UserDetails[]>([]);


  constructor(private http: HttpClient, private storage: NativeStorage) { }


  get UserDetails() {
    return this._userDetails.asObservable();
  }

  fatch(){

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
        
      })
    };

    return this.http.get<{[key: string] : Userdetails}>('http://localhost:8000/api/user_detail', httpOptions).pipe(map(data => {
      const delatils = [];
      for (const key in data) {
        if (data.hasOwnProperty(key)){
      delatils.push(
        data[key].address_line_1,
        data[key].address_line_2,
        data[key].dob,
        data[key].first_name,
        data[key].id,
        data[key].last_name,
        data[key].phoneNumber,
        data[key].ssn );
      }
    }
        console.log(delatils);
        return delatils;
      }), tap(userdata => {
        this._userDetails.next(userdata);
      })
    );
  }

  imageUplode(image: string){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
        
      })
    };
    console.log(image);
    return this.http.post<any>('http://localhost:8000/api/user/update_image', JSON.stringify({
   'avatar': image
    }), httpOptions).pipe().subscribe(error => console.log(error) );
    

  }

  getimage() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
        
      })
    };

    return this.http.get<any>('http://localhost:8000/api/user/image', httpOptions);
  }


}
