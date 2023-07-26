import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TratarEncPesquisaComponent } from './tratar-enc-pesquisa.component';

const routes: Routes = [
    {
        path: '',
        component: TratarEncPesquisaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TratarEncPesquisaRoutingModule { }
