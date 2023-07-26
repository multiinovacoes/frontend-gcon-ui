import { ListaEncaminhamentosRecebidosComponent } from './lista-encaminhamentos-recebidos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: ListaEncaminhamentosRecebidosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListaEncaminhamentosRecebidosRoutingModule { }
