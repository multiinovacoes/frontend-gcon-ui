import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EncaminhamentoSetorComponent } from './encaminhamento-setor.component';


    const routes: Routes = [
        {
            path: '',
            component: EncaminhamentoSetorComponent
        }
    ];


    @NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })

export class EncaminhamentoSetorRoutingModule { }