import { ModeloDocumentoCadastroComponent } from './modelo-documento-cadastro.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: ModeloDocumentoCadastroComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ModeloDocumentoCadastroRoutingModule { }
