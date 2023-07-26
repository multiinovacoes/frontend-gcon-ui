import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardGerencialComponent } from './dashboard-gerencial.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardGerencialComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardGerencialRoutingModule { }