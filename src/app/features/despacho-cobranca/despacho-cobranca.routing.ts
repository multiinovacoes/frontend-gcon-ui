import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DespachoCobrancaComponent } from './despacho-cobranca.component';

    const routes: Routes = [
        {
            path: '',
            component: DespachoCobrancaComponent
        },
    ];


    @NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })

export class DespachoCobrancaRoutingModule { }