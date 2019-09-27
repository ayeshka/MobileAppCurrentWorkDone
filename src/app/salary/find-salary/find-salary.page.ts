import { Component, OnInit, OnDestroy } from '@angular/core';
import { Salary } from '../salary.modle';
import { Subscription } from 'rxjs';
import { SalaryService } from '../salary.service';

@Component({
  selector: 'app-find-salary',
  templateUrl: './find-salary.page.html',
  styleUrls: ['./find-salary.page.scss'],
})
export class FindSalaryPage implements OnInit, OnDestroy {
  loadingSalary = false;
  loadedSalary: Salary[];
 
  
  
  private salarySub: Subscription;
  constructor(private slaryService: SalaryService) { }
 ngOnInit() {
  
   this.salarySub =  this.slaryService.salary.subscribe(salary => {
    this.loadingSalary = true;
       this.loadedSalary = salary;
       console.log(this.loadedSalary);
     });
   }
 ngOnDestroy() {
     if (this.salarySub) {
       this.salarySub.unsubscribe();
     }
   }

   ionViewWillEnter() {
//this.loadingSalary = true;
this.slaryService.fetchSalary().subscribe(() => {
//this.loadingSalary = false;
});
   }

   getItems(ev: any) {
  

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.loadingSalary = true;
      this. loadedSalary = this. loadedSalary.filter((item) => {
        return (item.basicSalary.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else {
      this.salarySub =  this.slaryService.salary.subscribe(salary => {
        this.loadingSalary = true;
           this.loadedSalary = salary;
           console.log(this.loadedSalary);
         });
    }
  }




}