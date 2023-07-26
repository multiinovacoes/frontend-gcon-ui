import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtendimentoSecretariaComponent } from './atendimento-secretaria.component';

    const routes: Routes = [
        {
            path: '',
            component: AtendimentoSecretariaComponent
        }
    ];


    @NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })

export class AtendimentoSecretariaRoutingModule { }