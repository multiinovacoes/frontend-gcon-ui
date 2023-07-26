import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaDetalheAssuntoComponent } from './lista-detalhe-assunto.component';

const routes: Routes = [
    {
        path: '',
        component: ListaDetalheAssuntoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListaDetalheAssuntoRoutingModule { }
