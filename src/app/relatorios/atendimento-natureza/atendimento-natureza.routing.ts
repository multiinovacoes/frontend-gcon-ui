import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtendimentoNaturezaComponent } from './atendimento-natureza.component';
import { ListaDetalheComponent } from './lista-detalhe/lista-detalhe.component';

    const routes: Routes = [
        {
            path: '',
            component: AtendimentoNaturezaComponent
        },

        {
            path: 'lista-detalhe',
            component: ListaDetalheComponent,
            loadChildren: () => import('src/app/relatorios/atendimento-natureza/lista-detalhe/lista-detalhe.module').
            then(m => m.ListaDetalheModule)
        }
    ];


    @NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })

export class AtendimentoNaturezaRoutingModule { }