import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtendimentoOrigemComponent } from './atendimento-origem.component';

    const routes: Routes = [
        {
            path: '',
            component: AtendimentoOrigemComponent
        }
    ];


    @NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })

export class AtendimentoOrigemRoutingModule { }