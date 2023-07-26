import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TratarEncCadastroComponent } from './tratar-enc-cadastro/tratar-enc-cadastro.component';
import { TratarEncPesquisaComponent } from './tratar-enc-pesquisa/tratar-enc-pesquisa.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'tratar-enc-pesquisa'
    },
    {
        path: 'tratar-enc-pesquisa',
        component: TratarEncPesquisaComponent,
        loadChildren: () => import('src/app/features/tratar-encaminhamento/tratar-enc-pesquisa/tratar-enc-pesquisa.module').
        then(m => m.TratarEncPesquisaModule)
    },
    {
      path: 'tratar-enc-cadastro',
      component: TratarEncCadastroComponent,
      loadChildren: () => import('src/app/features/tratar-encaminhamento/tratar-enc-cadastro/tratar-enc-cadastro.module').
      then(m => m.TratarEncCadastroModule)
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TratarEncaminhamentoRoutingModule { }
