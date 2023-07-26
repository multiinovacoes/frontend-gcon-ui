import { TipoDocumentoPesquisaComponent } from './tipo-documento-pesquisa/tipo-documento-pesquisa.component';
import { TipoDocumentoCadastroComponent } from './tipo-documento-cadastro/tipo-documento-cadastro.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'tipo-documento-pesquisa'
    },
    {
        path: 'tipo-documento-pesquisa',
        component: TipoDocumentoPesquisaComponent,
        loadChildren: () => import('src/app/features/tipo-documento/tipo-documento-pesquisa/tipo-documento-pesquisa.module').
        then(m => m.TipoDocumentoPesquisaModule)
    },
    {
      path: 'tipo-documento-cadastro',
      component: TipoDocumentoCadastroComponent,
      loadChildren: () => import('src/app/features/tipo-documento/tipo-documento-cadastro/tipo-documento-cadastro.module').
      then(m => m.TipoDocumentoCadastroModule)
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TipoDocumentoRoutingModule { }
