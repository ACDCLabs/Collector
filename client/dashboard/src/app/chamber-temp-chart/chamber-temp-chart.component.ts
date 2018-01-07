import { Component, OnInit } from '@angular/core';
import { ArduinoCloudService } from '../arduinoCloudService.service';
import { Observable } from 'rxjs/Observable';
import { TempChartComponent } from '../charts/temp-chart/temp-chart.component';
import { SensorList } from '../models/sensor-list/sensor-list';

@Component({
  selector: 'chamber-temp-chart',
  templateUrl: './chamber-temp-chart.component.html',
  styleUrls: ['./chamber-temp-chart.component.css'],
  providers: [ArduinoCloudService]
})

export class ChamberTempChartComponent implements OnInit {
  private temperatures: number[] =[];
  // private sensorPositions: number[];
  private temperatureCurve: number[][]= [[]];
  private sensorList = SensorList;

  constructor(private arduinoCloudService: ArduinoCloudService) {
    this.temperatureCurve = this.buildTemperatureCurve(this.temperatures);
    this.pollTemperatures();
  }

  ngOnInit() {
    this.arduinoCloudService.readAllTemperatures()
    .subscribe((value) => {
      this.temperatures = value["data"]["Temp"];
      this.temperatureCurve = this.buildTemperatureCurve(this.temperatures);
      // console.log(this.temperatureCurve);
    });
  }

  private pollTemperatures(time = 2000) {
    return Observable.interval(time)
      .switchMap(() => this.arduinoCloudService.readAllTemperatures())
      .subscribe((value) => {
        this.temperatures = value["data"]["Temp"];
        this.temperatureCurve = this.buildTemperatureCurve(this.temperatures);
        // console.log(this.temperatureCurve);
      });
  }

  private buildTemperatureCurve(temperatures: number[]): number[][] {
    let tempsAndPositions: number[][] = [[]];
    let i = 0;
    let len = temperatures.length;
    while (i < len) {
      tempsAndPositions[i] = [this.sensorList[i].position, temperatures[i]];
      i++;
    }

    tempsAndPositions.sort(this.sortFunction);

    return tempsAndPositions;
  }

  private sortFunction(a, b) {
    if (a[0] === b[0]) {
      return 0;
    }
    else {
      return (a[0] < b[0]) ? -1 : 1;
    }
  }

}
