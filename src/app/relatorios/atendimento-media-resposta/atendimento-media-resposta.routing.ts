import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtendimentoMediaRespostaComponent } from './atendimento-media-resposta.component';

    const routes: Routes = [
        {
            path: '',
            component: AtendimentoMediaRespostaComponent
        }
    ];


    @NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })

export class AtendimentoMediaRespostaRoutingModule { }