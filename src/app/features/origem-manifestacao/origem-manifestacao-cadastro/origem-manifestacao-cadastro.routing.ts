import { OrigemManifestacaoCadastroComponent } from './origem-manifestacao-cadastro.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: OrigemManifestacaoCadastroComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrigemManifestacaoCadastroRoutingModule { }
