import { AreaCadastroComponent } from 'src/app/features/area/area-cadastro/area-cadastro.component';
import { AreaCadastroRoutingModule } from './area-cadastro.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';

@NgModule({
  imports: [
    CommonModule,
    AreaCadastroRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    AreaCadastroComponent
  ]
})
export class AreaCadastroModule { }
