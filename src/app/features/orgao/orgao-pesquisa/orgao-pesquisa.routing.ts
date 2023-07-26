import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrgaoPesquisaComponent } from 'src/app/features/orgao/orgao-pesquisa/orgao-pesquisa.component';

const routes: Routes = [
    {
        path: '',
        component: OrgaoPesquisaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrgaoPesquisaRoutingModule { }
