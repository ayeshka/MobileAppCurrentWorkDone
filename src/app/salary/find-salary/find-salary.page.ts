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

       this.loadedSalary = salary;

     });
   }
 ngOnDestroy() {
     if (this.salarySub) {
       this.salarySub.unsubscribe();
     }
   }

   ionViewWillEnter() {
this.loadingSalary = true;
this.slaryService.fetchSalary().subscribe(() => {
this.loadingSalary = false;
});
   }

}