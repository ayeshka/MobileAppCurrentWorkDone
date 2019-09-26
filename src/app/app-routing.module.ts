import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'salary', pathMatch: 'full' },

  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  
  // { path: 'salary-details', loadChildren: './salary-list/salary-details/salary-details.module#SalaryDetailsPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },

  { path: 'calender', loadChildren: './calender/calender.module#CalenderPageModule' },
  { path: 'salary', loadChildren: './salary/salary.module#SalaryPageModule' },
 // { path: 'find-salary', loadChildren: './Salary/find-salary/find-salary.module#FindSalaryPageModule' },
 // { path: 'current-salary', loadChildren: './salary/current-salary/current-salary.module#CurrentSalaryPageModule' },
 // { path: 'salary-details', loadChildren: './salary/salary-details/salary-details.module#SalaryDetailsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
