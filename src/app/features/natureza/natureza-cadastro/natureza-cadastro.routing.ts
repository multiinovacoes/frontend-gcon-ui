import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NaturezaCadastroComponent } from 'src/app/features/natureza/natureza-cadastro/natureza-cadastro.component';

const routes: Routes = [
    {
        path: '',
        component: NaturezaCadastroComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NaturezaCadastroRoutingModule { }
