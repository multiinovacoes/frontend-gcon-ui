import { AssuntoCadastroComponent } from './assunto-cadastro/assunto-cadastro.component';
import { AssuntoPesquisaComponent } from './assunto-pesquisa/assunto-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'assunto-pesquisa'
    },
    {
        path: 'assunto-pesquisa',
        component: AssuntoPesquisaComponent,
        loadChildren: () => import('src/app/features/assunto/assunto-pesquisa/assunto-pesquisa.module').
        then(m => m.AssuntoPesquisaModule)
    },
    {
      path: 'assunto-cadastro',
      component: AssuntoCadastroComponent,
      loadChildren: () => import('src/app/features/assunto/assunto-cadastro/assunto-cadastro.module').
      then(m => m.AssuntoCadastroModule)
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AssuntoRoutingModule { }
