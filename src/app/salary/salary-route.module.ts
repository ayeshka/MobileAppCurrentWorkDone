import {  NgModule } from '@angular/core';
import { RouterModule, Route, Routes } from '@angular/router';
import { SalaryPage } from './salary.page';

const routes: Routes = [
    {
        path: 'tabs',                             // tab routing
        component: SalaryPage,
        children: [                               // child route
{
    path: 'discover',                                    // this name should be tab name
    children: [
        {
            path: '',
            loadChildren: './find-salary/find-salary.module#FindSalaryPageModule'
        },
        {
            path: ':salaryId',
            loadChildren: './salary-details/salary-details.module#SalaryDetailsPageModule'
        }
    ]
},
{
    path: 'Home',                              // this name should be tab name
    children: [
        {
            path: '',
            loadChildren: './current-salary/current-salary.module#CurrentSalaryPageModule'
        },
        {
            path: ':salaryId',
            loadChildren: './salary-details/salary-details.module#SalaryDetailsPageModule'
        }
    ]
},
{
    path: '',
    redirectTo: '/salary/tabs/Home',
    pathMatch: 'full'
}
        ]
    },
    {
        path: '',
        redirectTo: '/salary/tabs/Home',
        pathMatch: 'full'
    }
    ];




@NgModule({
imports: [RouterModule.forChild(routes)],                   // here importe the router module
exports: [RouterModule]
})
export class SalaryRouteModule {

}