import { ListaManifestacoesStatusComponent } from './lista-manifestacoes-status.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        component: ListaManifestacoesStatusComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListaManifestacoesStatusRoutingModule { }
