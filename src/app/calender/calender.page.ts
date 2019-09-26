import { Component, OnInit, OnDestroy, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { Calender } from './calender.model';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { CalenderService } from './calender.service';
import { CalendarComponent } from 'ionic2-calendar/calendar';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.page.html',
  styleUrls: ['./calender.page.scss'],
})
export class CalenderPage implements OnInit, OnDestroy{


  // title: string;
  // desc: string;
  // startTime: Date;
  // endTime: Date;
  // allDay: boolean;
   event = {
        title: '',
      desc: '',
       startTime: '',
        endTime: '',
      allDay: 'false'
     };

  // event : Calender[];

 
  minDate = new Date().toISOString();
 
  eventSource: Calender[];
  eventSub: Subscription;
  viewTitle;
 
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
 
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
 
  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string, private calenderService: CalenderService) { }
 
  ngOnInit() {
    this.resetEvent(); 
    this.eventSub = this.calenderService.EventSource.subscribe(event => {
      this.eventSource = event;
      
    });
    
  }

    ionViewWillEnter() {
      this.calenderService.fatch().subscribe();
    }

  ngOnDestroy() {
  if(this.eventSub) {
    this.eventSub.unsubscribe();
  }
  }


 
  resetEvent() {
     this.event = {
       title: '',
       desc: '',
       startTime: new Date().toISOString(),
       endTime: new Date().toISOString(),
       allDay: 'false'
     };
  }
 
  // Create the right event format and reload source
  // addEvent() {
  
  //   let eventCopy = {
  //      title: this.event.title,
  //      startTime:  new Date(this.event.startTime),
  //      endTime: new Date(this.event.endTime),
  //     allDay: this.event.allDay,
  //      desc: this.event.desc
  //    }



  //   if (eventCopy.allDay==='true') {
  //         let start = eventCopy.startTime;
  //       console.log(start);
  //         let end = eventCopy.endTime;
  //         console.log(end);
      
  //         console.log(start.getUTCFullYear());
  //         eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
           
        
  //         eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
        
  //       }
 
 
   

  //   this.calenderService.addEvent(eventCopy.title, eventCopy.desc, eventCopy.startTime, eventCopy.endTime, eventCopy.allDay)
    
    // this.eventSource.push(eventCopy);
  //   this.myCal.loadEvents();
  //   this.resetEvent();
  // }

  // Change current month/week/day
 next() {
  var swiper = document.querySelector('.swiper-container')['swiper'];
  swiper.slideNext();
}
 
back() {
  var swiper = document.querySelector('.swiper-container')['swiper'];
  swiper.slidePrev();
}
 
// Change between month/week/day
changeMode(mode) {
  this.calendar.mode = mode;
}
 
// Focus today
today() {
  this.calendar.currentDate = new Date();
}
 
// Selected date reange and hence title changed
onViewTitleChanged(title) {
  this.viewTitle = title;
}
 
// Calendar event was clicked
async onEventSelected(event) {
  // Use Angular date pipe for conversion
  let start = formatDate(event.startTime, 'medium', this.locale);
  let end = formatDate(event.endTime, 'medium', this.locale);
 
  const alert = await this.alertCtrl.create({
    header: event.title,
    subHeader: event.desc,
    message: 'From: ' + start + '<br><br>To: ' + end,
    buttons: ['OK']
  });
  alert.present();
}
 
// Time slot was clicked
onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());

}
}

