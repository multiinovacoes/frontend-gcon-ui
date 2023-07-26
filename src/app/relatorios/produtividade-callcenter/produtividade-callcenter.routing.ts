import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaDetalheCallcenterComponent } from './lista-detalhe-callcenter/lista-detalhe-callcenter.component';
import { ProdutividadeCallcenterComponent } from './produtividade-callcenter.component';

    const routes: Routes = [
        {
            path: '',
            component: ProdutividadeCallcenterComponent
        },

        {
            path: 'lista-detalhe-callcenter',
            component: ListaDetalheCallcenterComponent,
            loadChildren: () => import('src/app/relatorios/produtividade-callcenter/lista-detalhe-callcenter/lista-detalhe-callcenter.module').
            then(m => m.ListaDetalheCallcenterModule)
        }
      
    ];


    @NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })

export class ProdutividadeCallcenterRoutingModule { }