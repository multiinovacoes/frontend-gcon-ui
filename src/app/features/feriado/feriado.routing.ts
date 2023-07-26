import { FeriadoPesquisaComponent } from './feriado-pesquisa/feriado-pesquisa.component';
import { FeriadoCadastroComponent } from './feriado-cadastro/feriado-cadastro.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'feriado-pesquisa'
    },
    {
        path: 'feriado-pesquisa',
        component: FeriadoPesquisaComponent,
        loadChildren: () => import('src/app/features/feriado/feriado-pesquisa/feriado-pesquisa.module').
        then(m => m.FeriadoPesquisaModule)
    },
    {
      path: 'feriado-cadastro',
      component: FeriadoCadastroComponent,
      loadChildren: () => import('src/app/features/feriado/feriado-cadastro/feriado-cadastro.module').
      then(m => m.FeriadoCadastroModule)
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeriadoRoutingModule { }
