import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChamberTempChartComponent } from './chamber-temp-chart/chamber-temp-chart.component';
import { TempGaugeCtrlComponent } from './charts/tempGaugeCtrl/tempGaugeCtrl.component';
import { ChamberDashboardComponent } from './chamber-dashboard/chamber-dashboard.component';
import { ChamberTempDisplayComponent } from './chamber-temp-display/chamber-temp-display.component';
import { ChamberHistoryComponent } from './chamber-history/chamber-history.component';

const routes: Routes = [
  { path: '', redirectTo: '/history', pathMatch: 'full' },
  { path: 'dashboard', component: ChamberDashboardComponent },
  { path: 'gaugeCtrl', component: TempGaugeCtrlComponent },
  { path: 'chart', component: ChamberTempChartComponent },
  { path: 'temp-display', component: ChamberTempDisplayComponent },
  { path: 'history', component: ChamberHistoryComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
