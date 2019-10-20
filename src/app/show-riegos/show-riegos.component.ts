import { Component, OnInit } from '@angular/core';
import { DispositivoService } from '../servicios/dispositivo.service';
import { Riego } from '../model/riegos';

@Component({
  selector: 'app-show-riegos',
  templateUrl: './show-riegos.component.html',
  styleUrls: ['./show-riegos.component.scss'],
})
export class ShowRiegosComponent implements OnInit {

  constructor(public rServ:DispositivoService) { }

  ngOnInit() {
    this.rServ.leerRiegos().then((listado:Riego[])=>{
      this.rServ.listadoRiegos=listado;
    });
  }

}
