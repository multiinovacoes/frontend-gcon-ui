import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaDetalheEncaminhamentoComponent } from './lista-detalhe-encaminhamento.component';


const routes: Routes = [
    {
        path: '',
        component: ListaDetalheEncaminhamentoComponent
    },
    {
        path: 'lista-detalhe',
        component: ListaDetalheEncaminhamentoComponent,
        loadChildren: () => import('src/app/relatorios/lista-detalhe-encaminhamento/lista-detalhe-encaminhamento.module').
        then(m => m.ListaDetalheEncaminhamentoModule)
    }    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListaDetalheEncaminhamentoRoutingModule { }
