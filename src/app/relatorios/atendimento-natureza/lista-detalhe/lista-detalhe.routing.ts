import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaDetalheComponent } from './lista-detalhe.component';

const routes: Routes = [
    {
        path: '',
        component: ListaDetalheComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListaDetalheRoutingModule { }
