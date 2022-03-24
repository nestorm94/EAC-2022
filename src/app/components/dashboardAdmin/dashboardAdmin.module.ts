import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { DashboarAdmindRoutingModule } from './dashboardAdmin-routing.module';
import { DashboardAdminComponent } from './dashboardAdmin.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    DashboardAdminComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    DashboarAdmindRoutingModule,
    SharedModule
  ]
})
export class DashboarAdmindModule { }
