import { AtendimentoAreaConsultaModule } from './atendimento-area-consulta/atendimento-area-consulta.module';
import { AtendimentoAreaConsultaComponent } from './atendimento-area-consulta/atendimento-area-consulta.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'atendimento-area-consulta'
    },
    {
        path: 'atendimento-area-consulta',
        component: AtendimentoAreaConsultaComponent,
        loadChildren: () => import('src/app/relatorios/atendimento-area/atendimento-area-consulta/atendimento-area-consulta.module').
        then(m => m.AtendimentoAreaConsultaModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AtendimentoAreaRoutingModule { }
