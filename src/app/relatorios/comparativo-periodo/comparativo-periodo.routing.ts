import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComparativoPeriodoComponent } from './comparativo-periodo.component';

    const routes: Routes = [
        {
            path: '',
            component: ComparativoPeriodoComponent
        }
    ];


    @NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })

export class ComparativoPeriodoRoutingModule { }