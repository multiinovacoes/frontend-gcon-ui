import { AtendimentoPesquisaComponent } from './atendimento-pesquisa/atendimento-pesquisa.component';
import { AtendimentoCadastroComponent } from './atendimento-cadastro/atendimento-cadastro.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'atendimento-pesquisa'
    },
    {
        path: 'atendimento-pesquisa',
        component: AtendimentoPesquisaComponent,
        loadChildren: () => import('src/app/features/atendimento/atendimento-pesquisa/atendimento-pesquisa.module').
        then(m => m.AtendimentoPesquisaModule)
    },
    {
      path: 'atendimento-cadastro',
      component: AtendimentoCadastroComponent,
      loadChildren: () => import('src/app/features/atendimento/atendimento-cadastro/atendimento-cadastro.module').
      then(m => m.AtendimentoCadastroModule)
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AtendimentoRoutingModule { }
