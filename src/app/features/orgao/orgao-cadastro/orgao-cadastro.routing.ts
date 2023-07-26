import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrgaoCadastroComponent } from 'src/app/features/orgao/orgao-cadastro/orgao-cadastro.component';

const routes: Routes = [
    {
        path: '',
        component: OrgaoCadastroComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrgaoCadastroRoutingModule { }
