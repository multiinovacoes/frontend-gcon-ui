import { TipoManifestanteCadastroComponent } from './tipo-manifestante-cadastro/tipo-manifestante-cadastro.component';
import { TipoManifestantePesquisaComponent } from './tipo-manifestante-pesquisa/tipo-manifestante-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'tipo-manifestante-pesquisa'
    },
    {
        path: 'tipo-manifestante-pesquisa',
        component: TipoManifestantePesquisaComponent,
        loadChildren: () => import('src/app/features/tipo-manifestante/tipo-manifestante-pesquisa/tipo-manifestante-pesquisa.module').
        then(m => m.TipoManifestantePesquisaModule)
    },
    {
      path: 'tipo-manifestante-cadastro',
      component: TipoManifestanteCadastroComponent,
      loadChildren: () => import('src/app/features/tipo-manifestante/tipo-manifestante-cadastro/tipo-manifestante-cadastro.module').
      then(m => m.TipoManifestanteCadastroModule)
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TipoManifestanteRoutingModule { }
