import { OrigemManifestacaoPesquisaComponent } from './origem-manifestacao-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: OrigemManifestacaoPesquisaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrigemManifestacaoPesquisaRoutingModule { }
