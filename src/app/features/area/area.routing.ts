import { AreaPesquisaComponent } from './area-pesquisa/area-pesquisa.component';
import { AreaCadastroComponent } from './area-cadastro/area-cadastro.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/gaurds/auth.gaurd';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'area-pesquisa'
    },
    {
        path: 'area-pesquisa',
        component: AreaPesquisaComponent,
        loadChildren: () => import('src/app/features/area/area-pesquisa/area-pesquisa.module').
        then(m => m.AreaPesquisaModule)
    },
    {
      path: 'area-cadastro',
      component: AreaCadastroComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CADASTRAR_AREA'] },
      loadChildren: () => import('src/app/features/area/area-cadastro/area-cadastro.module').
      then(m => m.AreaCadastroModule)
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AreaRoutingModule { }
