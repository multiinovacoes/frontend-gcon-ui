import { SetorPesquisaComponent } from './setor-pesquisa/setor-pesquisa.component';
import { SetorCadastroComponent } from './setor-cadastro/setor-cadastro.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'setor-pesquisa'
    },
    {
        path: 'setor-pesquisa',
        component: SetorPesquisaComponent,
        loadChildren: () => import('src/app/features/setor/setor-pesquisa/setor-pesquisa.module').
        then(m => m.SetorPesquisaModule)
    },
    {
      path: 'setor-cadastro',
      component: SetorCadastroComponent,
      loadChildren: () => import('src/app/features/setor/setor-cadastro/setor-cadastro.module').
      then(m => m.SetorCadastroModule)
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SetorRoutingModule { }
