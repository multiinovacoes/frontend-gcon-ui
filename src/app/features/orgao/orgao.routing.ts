import { OrgaoPesquisaComponent } from './orgao-pesquisa/orgao-pesquisa.component';
import { OrgaoCadastroComponent } from './orgao-cadastro/orgao-cadastro.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'orgao-pesquisa'
    },
    {
        path: 'orgao-pesquisa',
        component: OrgaoPesquisaComponent,
        loadChildren: () => import('src/app/features/orgao/orgao-pesquisa/orgao-pesquisa.module').
        then(m => m.OrgaoPesquisaModule)
    },
    {
      path: 'orgao-cadastro',
      component: OrgaoCadastroComponent,
      loadChildren: () => import('src/app/features/orgao/orgao-cadastro/orgao-cadastro.module').
      then(m => m.OrgaoCadastroModule)
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrgaoRoutingModule { }
