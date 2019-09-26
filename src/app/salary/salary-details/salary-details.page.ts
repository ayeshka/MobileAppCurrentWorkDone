import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Salary } from '../salary.modle';
import { SalaryService } from '../salary.service';

@Component({
  selector: 'app-salary-details',
  templateUrl: './salary-details.page.html',
  styleUrls: ['./salary-details.page.scss'],
})
export class SalaryDetailsPage implements OnInit, OnDestroy {
  salaryDetails: Salary;
  private salarySub: Subscription;
 
   constructor(
     private roure: ActivatedRoute,
     private salaryService: SalaryService ,
     private navCtrl: NavController
   ) { }
 
   ngOnInit() {
     this.roure.paramMap.subscribe(paramMap => {
       console.log(paramMap);
       if (!paramMap.has('salaryId')) {
         this.navCtrl.navigateBack('/salary');
         return;
       }
       this.salarySub =  this.salaryService.getsalaryId(paramMap.get('salaryId')).subscribe(salary => {
          this.salaryDetails = salary;
        });
     });
   }
  
   ngOnDestroy() {
 if (this.salarySub) {
   this.salarySub.unsubscribe();
 }
   }
 
 }