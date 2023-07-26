import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtendimentoPeriodoComponent } from './atendimento-periodo.component';

    const routes: Routes = [
        {
            path: '',
            component: AtendimentoPeriodoComponent
        }
    ];


    @NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })

export class AtendimentoPeriodoRoutingModule { }