import { Injectable } from '@angular/core';
import { Dispositivo } from '../model/dispositivo';
import{ HttpClient} from '@angular/common/http';
import { Medida } from '../model/medida';
import { Riego } from '../model/riegos';

@Injectable({
  providedIn: 'root'
})

export class DispositivoService {

  public listadoDispositivos:Dispositivo[]=[];
  public listadoMediciones:Medida[]=[{fecha:new Date("2019-10-12"), valor:30}];
  public dispositivo:Dispositivo= new Dispositivo();
  public listadoRiegos:Riego[]=[{logRiegoId:1, apertura:1,fecha:new Date("2019-10-13"), electrovalvulaId:1}];

  constructor(private http:HttpClient) {
    this.http.get('http://localhost:3500/dispositivos').toPromise().then((listado:Dispositivo[])=>{
      this.listadoDispositivos=listado;
    });
  }

  public eliminarDispositivo(dispositivo:Dispositivo){
    this.listadoDispositivos.splice(this.listadoDispositivos.indexOf(dispositivo),1);
    console.log(this.listadoDispositivos.length);
  }
  
  public async leerMedida():Promise<any> {
    console.log("Voy a leer la ultima medida del sensor "+this.dispositivo.nombre);
    let m= await this.http.get('http://localhost:3500/dispositivos/leerMedicion/'+ this.dispositivo.dispositivoId.toString()).toPromise();
    return(m);
  }

  public leerMediciones(){
    return(this.http.get('http://localhost:3500/mediciones/'+this.dispositivo.dispositivoId.toString()).toPromise())
  }

  public putMedicion(){
    console.log("Voy a agregar una medicion para el sensor "+this.dispositivo.nombre);
    this.http.post('http://localhost:3500/mediciones',{'dispositivoId':this.dispositivo.dispositivoId, 'valor':this.dispositivo.medida}).toPromise().then();
  }

  public leerRiegos(){
    return(this.http.get('http://localhost:3500/logins/'+this.dispositivo.dispositivoId.toString()).toPromise());
  }

  public logRiego(a:Number){
    console.log("Voy a hacer un login");
    this.http.post('http://localhost:3500/logins',{'electrovalvulaId':this.dispositivo.electrovalvulaId, 'apertura':a}).toPromise().then();
  }
}
