import { Component, OnInit } from '@angular/core';
import { DispositivoService } from '../servicios/dispositivo.service';
import { Dispositivo} from '../model/dispositivo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})

export class ListadoComponent implements OnInit {

  
  constructor(public aServ:DispositivoService, private _router:Router ) { 
  }

  ngOnInit() {
    
  }
  
  public editarDispositivo(a:Dispositivo){

    console.log("Voy a editar un dispositivo");
    console.log(a);
    this.aServ.dispositivo=a;
    this._router.navigate(['showDispositivo']);

  }
}
