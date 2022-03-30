import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { ReportesComponent } from './reportes/reportes.component';
import { Modulo1Component } from './modulo1/modulo1.component';
import { Modulo3Component } from './modulo3/modulo3.component';
import { Modulo2Component } from './modulo2/modulo2.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent,
    UsuariosComponent,
    InicioComponent,
    NavbarComponent,
    ReportesComponent,
    Modulo1Component,
    Modulo3Component,
    Modulo2Component,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
