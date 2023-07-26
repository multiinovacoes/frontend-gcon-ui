import { TipoRespostaPesquisaComponent } from './tipo-resposta-pesquisa/tipo-resposta-pesquisa.component';
import { TipoRespostaCadastroComponent } from './tipo-resposta-cadastro/tipo-resposta-cadastro.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'tipo-resposta-pesquisa'
    },
    {
        path: 'tipo-resposta-pesquisa',
        component: TipoRespostaPesquisaComponent,
        loadChildren: () => import('src/app/features/tipo-resposta/tipo-resposta-pesquisa/tipo-resposta-pesquisa.module').
        then(m => m.TipoRespostaPesquisaModule)
    },
    {
      path: 'tipo-resposta-cadastro',
      component: TipoRespostaCadastroComponent,
      loadChildren: () => import('src/app/features/tipo-resposta/tipo-resposta-cadastro/tipo-resposta-cadastro.module').
      then(m => m.TipoRespostaCadastroModule)
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TipoRespostaRoutingModule { }
