import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaDetalheCallcenterComponent } from './lista-detalhe-callcenter.component';


const routes: Routes = [
    {
        path: '',
        component: ListaDetalheCallcenterComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListaDetalheCallcenterRoutingModule { }
