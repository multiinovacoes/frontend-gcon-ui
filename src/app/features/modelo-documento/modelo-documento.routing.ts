import { ModeloDocumentoCadastroComponent } from './modelo-documento-cadastro/modelo-documento-cadastro.component';
import { ModeloDocumentoPesquisaComponent } from './modelo-documento-pesquisa/modelo-documento-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'modelo-documento-pesquisa'
    },
    {
        path: 'modelo-documento-pesquisa',
        component: ModeloDocumentoPesquisaComponent,
        loadChildren: () => import('src/app/features/modelo-documento/modelo-documento-pesquisa/modelo-documento-pesquisa.module').
        then(m => m.ModeloDocumentoPesquisaModule)
    },
    {
      path: 'modelo-documento-cadastro',
      component: ModeloDocumentoCadastroComponent,
      loadChildren: () => import('src/app/features/modelo-documento/modelo-documento-cadastro/modelo-documento-cadastro.module').
      then(m => m.ModeloDocumentoCadastroModule)
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ModeloDocumentoRoutingModule { }
