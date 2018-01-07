import { Component, OnInit } from '@angular/core';
import { ArduinoCloudService } from '../arduinoCloudService.service';
import { Sensor } from '../models/sensor/sensor';
import { SensorDescriptor } from '../models/sensor-descriptor/sensor-descriptor';
import { SensorList } from '../models/sensor-list/sensor-list';
import { HistoryChartComponent } from '../charts/history-chart/history-chart.component';

@Component({
  selector: 'chamber-history',
  templateUrl: './chamber-history.component.html',
  styleUrls: ['./chamber-history.component.css'],
  providers: [ArduinoCloudService]
})


export class ChamberHistoryComponent implements OnInit {

  constructor(private arduinoCloudService: ArduinoCloudService) { }

  private startDate = new Date('2017-12-30 11:30:00');
  private endDate = new Date('2017-12-30 11:31:10');

  private sensor: Sensor;
  private sensors: Sensor[] = [];
  private sensorList = SensorList;
  // private test: Sensor ;
  // private testarray: Sensor[] =[{time: this.startDate, num: 1, temp: 2}];
  private tempHistory = [this.startDate, 1];


  ngOnInit() {
    console.log("HistoryComponent ngInit");
    this.updateChart(this.startDate, this.endDate, 1);
  }

  private onClickSensorNum(sensorNum: number) {
    this.updateChart(this.startDate, this.endDate, sensorNum);
    console.log(sensorNum);
  }

  private updateChart(startDate: Date, endDate: Date, sensorNum: number) {
    this.arduinoCloudService.getHistoricTemperatures(startDate, endDate, sensorNum).subscribe((data) => {
      this.sensors = data;
      //console.log(this.sensors);
      this.tempHistory = this.buildChartArray(this.sensors);
      // console.log(this.tempHistory);
    });
  }

  private buildChartArray(sensorData: Sensor[]): Array<any> {
    return sensorData.map((data) => { return [new Date(data['time']).valueOf(), data['temp']]; });
  }
}
