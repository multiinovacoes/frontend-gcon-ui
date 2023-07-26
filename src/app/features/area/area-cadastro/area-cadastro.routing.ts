import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/gaurds/auth.gaurd';
import { AreaCadastroComponent } from 'src/app/features/area/area-cadastro/area-cadastro.component';

const routes: Routes = [
    {
        path: '',
        component: AreaCadastroComponent, canActivate: [AuthGuard]
       // data: { roles: ['ROLE_CADASTRAR_AREA2'] } 
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AreaCadastroRoutingModule { }
