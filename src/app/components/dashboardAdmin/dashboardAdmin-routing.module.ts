import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAdminComponent } from './dashboardAdmin.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
      { path: '', component: DashboardAdminComponent, children: [
        { path: 'registrar', component: RegisterComponent },
    

    ]  
  },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboarAdmindRoutingModule { }
