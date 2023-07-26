import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NaturezaPesquisaComponent } from 'src/app/features/natureza/natureza-pesquisa/natureza-pesquisa.component';

const routes: Routes = [
    {
        path: '',
        component: NaturezaPesquisaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NaturezaPesquisaRoutingModule { }
