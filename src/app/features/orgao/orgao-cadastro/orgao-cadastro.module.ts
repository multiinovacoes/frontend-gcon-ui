import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgaoCadastroRoutingModule } from 'src/app/features/orgao/orgao-cadastro/orgao-cadastro.routing';
import { OrgaoCadastroComponent } from 'src/app/features/orgao/orgao-cadastro/orgao-cadastro.component';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';

@NgModule({
  imports: [
    CommonModule,
    OrgaoCadastroRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    OrgaoCadastroComponent
  ]
})
export class OrgaoCadastroModule { }
