import { DescricaoOuvidoriaComponent } from './descricao-ouvidoria.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: DescricaoOuvidoriaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DescricaoOuvidoriaRoutingModule { }
