import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ArduinoCloudService } from '../../arduinoCloudService.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'tempGauge',
  templateUrl: './tempGauge.component.html',
  styleUrls: ['./tempGauge.component.css'],
  providers: [ArduinoCloudService]
})

export class TempGaugeComponent implements OnInit {

  private gaugeType = "arch";
  private gaugeLabel = "Temp";
  private gaugeAppendText = "°C";
  private gaugeForegroundColor ="rgba(255,0,0,1)";
  private gaugeMin = -40;
  private gaugeMax = 60;

  @Input()  gaugeTemp : number;


  constructor(private arduinoCloudService: ArduinoCloudService) {

    // this.drawTemperatureChart();

  }
  ngOnInit(): void  {

  }

  public calcForegroundColor(temperature: number): string{
    let colorString: string = "";
    let red: number = 0;
    let green: number =0;
    let blue: number =0;
    red = Math.floor((temperature - this.gaugeMin) / (this.gaugeMax - this.gaugeMin) *255);
    blue = Math.floor(255 -(temperature - this.gaugeMin) / (this.gaugeMax - this.gaugeMin) *255);
    colorString = "rgba("+red+",0,"+blue+",1)";
    // console.log(colorString);
    return colorString;
  }
}
