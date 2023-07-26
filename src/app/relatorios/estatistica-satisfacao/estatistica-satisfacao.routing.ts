import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstatisticaSatisfacaoComponent } from './estatistica-satisfacao.component';

    const routes: Routes = [
        {
            path: '',
            component: EstatisticaSatisfacaoComponent
        }
    ];


    @NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })

export class EstatisticaSatisfacaoRoutingModule { }