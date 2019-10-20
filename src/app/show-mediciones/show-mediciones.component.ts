import { Component, OnInit } from '@angular/core';
import { DispositivoService } from '../servicios/dispositivo.service';
import { Medida } from '../model/medida';

@Component({
  selector: 'app-show-mediciones',
  templateUrl: './show-mediciones.component.html',
  styleUrls: ['./show-mediciones.component.scss'],
})
export class ShowMedicionesComponent implements OnInit {

  constructor(public mServ:DispositivoService) {}

  ngOnInit() {
    this.mServ.leerMediciones().then((listado: Medida[])=>{
      this.mServ.listadoMediciones=listado;
    });
  }

}
