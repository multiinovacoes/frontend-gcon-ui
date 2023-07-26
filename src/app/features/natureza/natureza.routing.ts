import { NaturezaCadastroComponent } from 'src/app/features/natureza/natureza-cadastro/natureza-cadastro.component';
import { NaturezaPesquisaComponent } from 'src/app/features/natureza/natureza-pesquisa/natureza-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'natureza-pesquisa'
    },
    {
        path: 'natureza-pesquisa',
        component: NaturezaPesquisaComponent,
        loadChildren: () => import('src/app/features/natureza/natureza-pesquisa/natureza-pesquisa.module').
        then(m => m.NaturezaPesquisaModule)
    },
    {
      path: 'natureza-cadastro',
      component: NaturezaCadastroComponent,
      loadChildren: () => import('src/app/features/natureza/natureza-cadastro/natureza-cadastro.module').
      then(m => m.NaturezaCadastroModule)
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NaturezaRoutingModule { }
