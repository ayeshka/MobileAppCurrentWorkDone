import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Salary } from './salary.modle';
import { take, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface SalaryData {               // we need to get this information from backend
   id: string;
   payRollRN: string; // payroll Refference Number
 basicSalary: string;
 allowances: string;
 deductions: string;
 ETF: string;
  EPF: string;
 PAYE: string;

}

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  private _salary = new BehaviorSubject<Salary[]>(     // when get the data into the backand this should be empty arry
    [
      new Salary('s1', '1', '40000', '100', '400', '300', '40', '50' ),
      new Salary('s2', '2', '60000', '200', '300', '500', '30', '20' )
     ]
  );

  fetchSalary() {

   return this.http.get<{[key: string]: SalaryData }>('').pipe(map(resData =>{
     // console.log(resData);
     const salary = [];       // create salary arry
     for (const key in resData){
      if (resData.hasOwnProperty(key)) {  // check whether restData has key 
        salary.push(new Salary(       // push the element into the salarya arry
          key,
          resData[key].payRollRN,
          resData[key]. basicSalary,
          resData[key].allowances,
          resData[key].deductions,
          resData[key].ETF,
          resData[key].EPF,
          resData[key].PAYE
          ),
         );
      }
     }
     return salary;
    }), tap(salary => {
   this._salary.next(salary); // salary arry put into the _salary behaviorsubject
    })
    );
  }

get salary() {
  return this._salary.asObservable();
}

getsalaryId(id: string){
  return this.salary.pipe(take(1), map(salary => {
    return {...salary.find(p => p.id === id)};
  }));
  }

  constructor(private http: HttpClient) { }
}
