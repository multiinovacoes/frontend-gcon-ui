import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtendimentoTipoManifestanteComponent } from './atendimento-tipo-manifestante.component';

    const routes: Routes = [
        {
            path: '',
            component: AtendimentoTipoManifestanteComponent
        }
    ];


    @NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })

export class AtendimentoTipoManifestanteRoutingModule { }