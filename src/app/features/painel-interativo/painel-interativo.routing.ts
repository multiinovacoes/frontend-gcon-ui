import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PainelInterativoComponent } from './painel-interativo.component';

    const routes: Routes = [
        {
            path: '',
            component: PainelInterativoComponent
        },
    ];


    @NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })

export class PainelInterativoRoutingModule { }