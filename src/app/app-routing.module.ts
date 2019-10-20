import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ShowDispositivoComponent } from './show-dispositivo/show-dispositivo.component';
import { ShowMedicionesComponent } from "./show-mediciones/show-mediciones.component";
import { ShowRiegosComponent } from './show-riegos/show-riegos.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'showDispositivo', component:ShowDispositivoComponent},
  { path: 'showMediciones', component:ShowMedicionesComponent},
  { path: 'showRiegos', component:ShowRiegosComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
