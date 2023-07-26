import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaPesquisaComponent } from 'src/app/features/area/area-pesquisa/area-pesquisa.component';

const routes: Routes = [
    {
        path: '',
        component: AreaPesquisaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AreaPesquisaRoutingModule { }
