import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcessoNegadoComponent } from './acesso-negado.component';


const routes: Routes = [
    {
        path: 'acesso-negado',
        component: AcessoNegadoComponent,
        loadChildren: () => import('src/app/features/seguranca/acesso-negado/acesso-negado.module').
        then(m => m.AcessoNegadoModule)
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AcessoNegadoRoutingModule { }
