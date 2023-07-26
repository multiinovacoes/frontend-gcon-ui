import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtendimentoUsuarioComponent } from './atendimento-usuario.component';

    const routes: Routes = [
        {
            path: '',
            component: AtendimentoUsuarioComponent
        }
    ];


    @NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })

export class AtendimentoUsuarioRoutingModule { }