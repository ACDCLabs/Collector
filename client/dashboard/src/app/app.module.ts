import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }   from '@angular/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArduinoCloudService } from './arduinoCloudService.service';
import { NgxGaugeModule } from 'ngx-gauge';
import { ChartModule } from 'angular-highcharts';
import { TempGaugeComponent} from './charts/tempGauge/tempGauge.component';
import { TempGaugeCtrlComponent} from './charts/tempGaugeCtrl/tempGaugeCtrl.component';
import { TempChartComponent } from './charts/temp-chart/temp-chart.component';
import { TempProfileChartComponent } from './charts/temp-profile-chart/temp-profile-chart.component';
import { ChamberTempChartComponent} from './chamber-temp-chart/chamber-temp-chart.component';
import { ChamberDashboardComponent} from './chamber-dashboard/chamber-dashboard.component';
import { AppRoutingModule } from './/app-routing.module'
import { AlertModule } from 'ngx-bootstrap';
import { CollapseModule} from 'ngx-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { HeatmapComponent } from './charts/heatmap/heatmap.component';
import { ChamberHistoryComponent } from './chamber-history/chamber-history.component';
import { HistoryChartComponent } from './charts/history-chart/history-chart.component';
import { Sensor } from './models/sensor/sensor';
import { SensorDescriptor } from './models/sensor-descriptor/sensor-descriptor';
import { ChamberTempDisplayComponent } from './chamber-temp-display/chamber-temp-display.component';
//import { SensorList } from './models/sensor-list/sensor-list';

@NgModule({
  declarations: [
    AppComponent,
    TempGaugeComponent,
    TempGaugeCtrlComponent,
    TempChartComponent,
    TempProfileChartComponent,
    ChamberTempChartComponent,
    ChamberDashboardComponent,
    NavbarComponent,
    HeatmapComponent,
    ChamberHistoryComponent,
    HistoryChartComponent,
    Sensor,
    SensorDescriptor,
    ChamberTempDisplayComponent
    // SensorList
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot(),
    AlertModule.forRoot(),
    CollapseModule.forRoot(),
    NgxGaugeModule,
    ChartModule,
    AppRoutingModule
  ],
  providers: [ArduinoCloudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
