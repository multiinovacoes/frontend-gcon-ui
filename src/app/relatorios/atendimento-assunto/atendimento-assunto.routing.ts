import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtendimentoAssuntoComponent } from './atendimento-assunto.component';
import { ListaDetalheAssuntoComponent } from './lista-detalhe-assunto/lista-detalhe-assunto.component';

    const routes: Routes = [
        {
            path: '',
            component: AtendimentoAssuntoComponent
        },

        {
            path: 'lista-detalhe-assunto',
            component: ListaDetalheAssuntoComponent,
            loadChildren: () => import('src/app/relatorios/atendimento-assunto/lista-detalhe-assunto/lista-detalhe-assunto.module').
            then(m => m.ListaDetalheAssuntoModule)
        }        
    ];


    @NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })

export class AtendimentoAssuntoRoutingModule { }