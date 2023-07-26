import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EficienciaOuvidoriaComponent } from './eficiencia-ouvidoria.component';

    const routes: Routes = [
        {
            path: '',
            component: EficienciaOuvidoriaComponent
        }
    ];


    @NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })

export class EficienciaOuvidoriaRoutingModule { }