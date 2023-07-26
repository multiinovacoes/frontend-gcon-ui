import { OrigemManifestacaoPesquisaComponent } from './origem-manifestacao-pesquisa/origem-manifestacao-pesquisa.component';
import { OrigemManifestacaoCadastroComponent } from './origem-manifestacao-cadastro/origem-manifestacao-cadastro.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'origem-manifestacao-pesquisa'
    },
    {
        path: 'origem-manifestacao-pesquisa',
        component: OrigemManifestacaoPesquisaComponent,
        loadChildren: () => import('src/app/features/origem-manifestacao/origem-manifestacao-pesquisa/origem-manifestacao-pesquisa.module').
        then(m => m.OrigemManifestacaoPesquisaModule)
    },
    {
      path: 'origem-manifestacao-cadastro',
      component: OrigemManifestacaoCadastroComponent,
      loadChildren: () => import('src/app/features/origem-manifestacao/origem-manifestacao-cadastro/origem-manifestacao-cadastro.module').
      then(m => m.OrigemManifestacaoCadastroModule)
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrigemManifestacaoRoutingModule { }
