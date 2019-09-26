import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SalaryPage } from './salary.page';
import { SalaryRouteModule } from './salary-route.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalaryRouteModule                 // here imporete the salaryroutemodule
  ],
  declarations: [SalaryPage]
})
export class SalaryPageModule {}
