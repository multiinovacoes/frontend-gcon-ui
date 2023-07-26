import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TratarEncCadastroComponent } from './tratar-enc-cadastro.component';


const routes: Routes = [
    {
        path: '',
        component: TratarEncCadastroComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TratarEncCadastroRoutingModule { }
