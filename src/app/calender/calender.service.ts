import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http,Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs';
import { Calender } from './calender.model';
import { map, tap } from 'rxjs/operators';

interface CalenderDetails {
  
  title: string;
  desc: string;
  startTime: Date; 
  endTime: Date;
  allDay: string; 

}

@Injectable({
  providedIn: 'root'
})
export class CalenderService {

  

  constructor(private http: HttpClient,private https:Http) { }


  private _eventSource = new BehaviorSubject<Calender[]>([]);


  get EventSource() {
    return this._eventSource.asObservable();
  }

//  addEvent(title: string, desc: string, startTime: Date, endTime: Date, allDay: string) {

 

//    const newEvent = new Calender(
     
//      title,
//      desc,
//      startTime,
//      endTime,
//      allDay,
     
    

//   );

  // const exex = {
  //   "title": "test 8",
  //   "desc": "does this work ?",
  //   "startTime": "Mon Jun 03 2019 12:00:00 GMT+0530 (India Standard Time)",
  //   "endTime": "Mon Jun 03 2019 12:00:00 GMT+0530 (India Standard Time)",
  //   "allDay": "false"
  // }
//   console.log(newEvent.allDay);
//   // if (newEvent.allDay) {
//   //    let start = newEvent.startTime;
//   //    console.log(start);
//   //    let end = newEvent.endTime;
//   //    console.log(end);

//   //    console.log(start.getUTCFullYear());
//   //    let startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
     
//   //    console.log(startTime);
//   //    let endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
//   //    console.log(endTime);
//   //  }
//   console.log(newEvent.allDay);

   
//  const curuntValue = this._eventSource.value;
  //  const updateValue = [...curuntValue, newEvent];
  //  this._eventSource.next(updateValue);

  //  const newCalander  = {
       
  //        title: 'wffff',
  //        desc : 'vfvdfv',
  //        startTime: 'Sun Jun 02 2019 12:00:00 GMT+0530 (India Standard Time) ',
  //        endTime: 'Sun Jun 02 2019 12:00:00 GMT+0530 (India Standard Time) ',
  //      allDay: 'true',
      
  //    };

// console.log(newEvent);
  //  return this.http.post<any>('http://localhost:8000/api/calender',exex);


  //  let headers = new Headers();


  //  headers.append('content-type', 'application/json');
// tslint:disable-next-line: object-literal-shorthand
  //  let options = new RequestOptions({ headers:headers});
   
  //  return new Promise((resolve , reject) => {
  //     this.https.post('http://localhost:8000/api/calender', JSON.stringify(newEvent), options).subscribe(res => {
  //        resolve(res.json());
  //     }, (err) => {
  //       reject(err);
  //      });
  //  });
 

// }

// getDate(ev : Date) {
//     let selected = new Date(ev.selectedTime);
//     this.startTime = selected.toISOString();
//     selected.setHours(selected.getHours() + 1);
//     this.endTime = (selected.toISOString());
 //}


  fatch(){
    return this.http.get<{[key: string] : CalenderDetails}>('').pipe(map(data => {
      const event = [];
      for (const key in data) {
        if (data.hasOwnProperty(key)){
          event.push(new Calender(
            data[key].title,
            data[key].desc,
            new Date(data[key].startTime),
            new Date(data[key].endTime),
            data[key].allDay
          ))
        }
      }
      console.log(event);
      return event;    }), tap(eventData => {
      this._eventSource.next(eventData);
      
    }));
  }
}
