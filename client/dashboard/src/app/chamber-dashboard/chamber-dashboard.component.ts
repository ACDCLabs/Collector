import { TempGaugeComponent } from '../charts/tempGauge/tempGauge.component';
import { Component, OnInit } from '@angular/core';
import { ArduinoCloudService } from '../arduinoCloudService.service';
import { Observable } from 'rxjs/Observable';
import { SensorList} from '../models/sensor-list/sensor-list';

@Component({
  selector: 'chamber-dashboardComponent',
  templateUrl: './chamber-dashboard.component.html',
  styleUrls: ['./chamber-dashboard.component.css'],
  providers: [ArduinoCloudService]
})

export class ChamberDashboardComponent implements OnInit {
  private temperatures: number[];
  private sensorPositions: number[];
  private temperatureCurve: number[][];
  private tempGradient: number;
  private sensorList = SensorList;

  constructor(private arduinoCloudService: ArduinoCloudService) {
    this.pollTemperatures();
  }

  ngOnInit() {
    this.temperatures = [50, -20, -5, 10, 20, 50];
    // console.log("dashboardComponent.ngOninit: " + this.temperatureCurve);
  }

  private pollTemperatures(time = 2000) {
    return Observable.interval(time)
      .switchMap(() => this.arduinoCloudService.readAllTemperatures())
      .subscribe((value) => {
        this.temperatures = value["data"]["Temp"];
        this.tempGradient = (this.temperatures[3] - this.temperatures[4])/
         (this.sensorList[3].position -this.sensorList[4].position)*10;
      });
  }

};
