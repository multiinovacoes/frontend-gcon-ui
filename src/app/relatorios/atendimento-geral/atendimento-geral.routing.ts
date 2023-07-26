import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtendimentoGeralComponent } from './atendimento-geral.component';


    const routes: Routes = [
        {
            path: '',
            component: AtendimentoGeralComponent
        }
    ];


    @NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })

export class AtendimentoGeralRoutingModule { }