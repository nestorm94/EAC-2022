import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { ReportesComponent } from './reportes/reportes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { Modulo1Component } from './modulo1/modulo1.component';
import { Modulo2Component } from './modulo2/modulo2.component';
import { Modulo3Component } from './modulo3/modulo3.component';

const routes: Routes = [
      { path: '', component: DashboardComponent, children: [
      { path: 'inicio', component: InicioComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'reportes', component: ReportesComponent },
      { path: 'modulo1', component: Modulo1Component },
      { path: 'modulo2', component: Modulo2Component },
      { path: 'modulo3', component: Modulo3Component },

    ]  
  },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
