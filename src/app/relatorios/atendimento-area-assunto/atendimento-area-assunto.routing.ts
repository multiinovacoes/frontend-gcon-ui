import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtendimentoAreaAssuntoComponent } from './atendimento-area-assunto.component';

    const routes: Routes = [
        {
            path: '',
            component: AtendimentoAreaAssuntoComponent
        }
    ];


    @NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })

export class AtendimentoAreaAssuntoRoutingModule { }