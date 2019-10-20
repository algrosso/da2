import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DispositivoService } from '../../servicios/dispositivo.service';
import { Medida } from '../../model/medida';
import { Router } from '@angular/router';
import { Observable, Observer, Subscription, Subscriber } from 'rxjs';

declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'app-detalle-sensor',
  templateUrl: './app-detalle-sensor.component.html',
  styleUrls: ['./app-detalle-sensor.component.scss'],
})



export class DetalleSensorPage implements OnInit {

  private valorObtenido:Number=0;
  public myChart;
  private chartOptions;
  public observer:Observer<any> = {
    next: value => console.log('Valor recibido: ', value),
    error: err => console.error('Error encontrado: ', err),
    complete: () => console.log('Ya no hay más valores por recibir')
  };

  constructor( public dServ : DispositivoService, private _router:Router) { 
    this.dServ.leerMedida().then((lm:Medida[])=>{
      this.dServ.dispositivo.medida=lm[0].valor
      let m=lm[0].valor;
      setTimeout(()=> {
        console.log("Cambio el valor del sensor");
        //llamo al update del chart para refrescar y mostrar el nuevo valor
        this.myChart.update({series: [{
            name: 'kPA',
            data: [Number(m)],
            tooltip: {
                valueSuffix: ' kPA'
            }
        }]});
      },1000);
    });
  } 


  public abrirValvula(m:Number){
    if( m<= 10 ){
      return;
    };
    this.dServ.logRiego(0);
    var funcionObservable=function (observer) {
      var i=0;
      var j=Number(m);
      while(j>10){
        i=i+1;
        j=j-1;
        (function(y) {setTimeout(() => {
          observer.next(1);
          },40*y);}
        )(i);
      };
      i=i+1;
      (function (y) {setTimeout(()=> {
        observer.complete();
        },50*y);}
      )(i);
      return {unsubscribe() { }};
    };
    const miObservable = new Observable(funcionObservable);
    var subscripcion= new Subscription;

    // Crear observer object
    const myObserver = {
      next: x => { this.dServ.dispositivo.medida=Number(this.dServ.dispositivo.medida)-x;
                    console.log('Observer modifico medida: ' + this.dServ.dispositivo.medida);
                    this.myChart.update({series: [{
                      name: 'kPA',
                      data: [Number(this.dServ.dispositivo.medida)],
                      tooltip: {
                          valueSuffix: ' kPA'
                      }
                  }]});
          
                 },
      error: err => console.error('Observer produjo un error: ' + err),
      complete: () => {console.log("Observer recibi'o una notificaci'on de completar");
                        this.dServ.logRiego(1);
                        this.dServ.putMedicion();
                      },
    };
    
    // Executa el observable
    subscripcion=miObservable.subscribe(myObserver);
    setTimeout(()=> {subscripcion.unsubscribe();}, (Number(this.dServ.dispositivo.medida)-9)*50);
  }

  public getMediciones(){
    console.log("Voy a listar las mediciones del sensor "+this.dServ.dispositivo.nombre);
    console.log(this.dServ.dispositivo);
    this._router.navigate(['showMediciones']);
    
  }

  public getRiegos(){
    console.log("Voy a listar los riegos del sensor "+this.dServ.dispositivo.electrovalvulaId);
    console.log(this.dServ.dispositivo);
    this._router.navigate(['showRiegos']);
    
  }

  ngOnInit() {
    this.generarChart();
}

  ionViewDidEnter() {
  }

  generarChart() {
    this.chartOptions={
      chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
        }
        ,title: {
          text: this.dServ.dispositivo.nombre
        }

        ,credits:{enabled:false}
        
           
        ,pane: {
            startAngle: -150,
            endAngle: 150
        } 
        // the value axis
      ,yAxis: {
        min: 0,
        max: 100,
  
        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',
  
        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: 'kPA'
        },
        plotBands: [{
            from: 0,
            to: 10,
            color: '#55BF3B' // green
        }, {
            from: 10,
            to: 30,
            color: '#DDDF0D' // yellow
        }, {
            from: 30,
            to: 100,
            color: '#DF5353' // red
        }]
    }
    ,
  
    series: [{
        name: 'kPA',
        data: [0],
        tooltip: {
            valueSuffix: ' kPA'
        }
    }]

    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions );
  }

}