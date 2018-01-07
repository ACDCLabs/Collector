import { Component, OnInit } from '@angular/core';
import { ArduinoCloudService } from '../arduinoCloudService.service';
import { Observable } from 'rxjs/Observable';
import { TempProfileChartComponent } from '../charts/temp-profile-chart/temp-profile-chart.component';
import { SensorList } from '../models/sensor-list/sensor-list';
import { SeriesOptions } from 'highcharts';

@Component({
  selector: 'chamber-temp-display',
  templateUrl: './chamber-temp-display.component.html',
  styleUrls: ['./chamber-temp-display.component.css']
})

export class ChamberTempDisplayComponent implements OnInit {

  private temperatures: number[] = [];
  private temperatureCurve: number[][] = [[]];
  private sensorList = SensorList;

  private temperatureSeries: SeriesOptions[];

  // source: Markus Heide: Page 38
  private referenceCurve =[[-41,0],[-28,6],[-22,11],[-16,20],[-7,30],[-1,42],[4,65],[5,95],[9,139]];

  constructor(private arduinoCloudService: ArduinoCloudService) {
    // this.temperatureCurve = this.buildChartSeries(this.temperatures);
    this.temperatureSeries = [
      { type: 'area', name: "Temperature", color: 'rgba(148,202,255,1.0)', data: [] },
      { type: 'line', name: "Ref", color: 'rgba(150,150,150,1.0)', data: this.referenceCurve }
    ];
    this.pollTemperatures();
  }

  ngOnInit() {
    this.arduinoCloudService.readAllTemperatures()
      .subscribe((value) => {
        this.temperatures = value["data"]["Temp"];
        this.temperatureSeries = this.buildChartSeries(this.temperatures);
      });
  }

  private pollTemperatures(time = 2000) {
    return Observable.interval(time)
      .switchMap(() => this.arduinoCloudService.readAllTemperatures())
      .subscribe((value) => {
        this.temperatures = value["data"]["Temp"];
        this.temperatureSeries = this.buildChartSeries(this.temperatures);
        // console.log(this.temperatureCurve);
      });
  }

  private buildChartSeries(temperatures: number[]): SeriesOptions[] {
    let tempsAndPositions: number[][] = [[]];
    let series: SeriesOptions[];
    let i = 0;
    let len = temperatures.length;
    while (i < len) {
      tempsAndPositions[i] = [temperatures[i], this.sensorList[i].position];
      i++;
    }

    tempsAndPositions.sort(this.sortFunction);

    series = [
      { type: 'area', name: "Temperature", color: 'rgba(148,202,255,1.0)', data: tempsAndPositions },
      { type: 'line', name: "Ref", color: 'rgba(150,150,150,1.0)', data: this.referenceCurve }
    ];
    // console.log(series);
    return series;
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
