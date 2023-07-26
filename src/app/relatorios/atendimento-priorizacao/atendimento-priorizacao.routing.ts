import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtendimentoPriorizacaoComponent } from './atendimento-priorizacao.component';

    const routes: Routes = [
        {
            path: '',
            component: AtendimentoPriorizacaoComponent
        }
    ];


    @NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })

export class AtendimentoPriorizacaoRoutingModule { }