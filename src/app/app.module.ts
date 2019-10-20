import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ShowDispositivoComponent } from './show-dispositivo/show-dispositivo.component';
import { DetalleSensorPage } from './show-dispositivo/app-detalle-sensor/app-detalle-sensor.component';
import { ShowMedicionesComponent} from './show-mediciones/show-mediciones.component'
import { ShowRiegosComponent } from './show-riegos/show-riegos.component';
import { KpaPipe } from './kpa.pipe';
import { FechaYhoraPipe } from './fecha-yhora.pipe';

@NgModule({
  declarations: [AppComponent, 
                 ShowDispositivoComponent, 
                 DetalleSensorPage,
                 ShowMedicionesComponent,
                 ShowRiegosComponent,
                 KpaPipe,
                 FechaYhoraPipe ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
