import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgaoPesquisaRoutingModule } from 'src/app/features/orgao/orgao-pesquisa/orgao-pesquisa.routing';
import { OrgaoPesquisaComponent } from 'src/app/features/orgao/orgao-pesquisa/orgao-pesquisa.component';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';

@NgModule({
  imports: [
    CommonModule,
    OrgaoPesquisaRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    OrgaoPesquisaComponent
  ]
})
export class OrgaoPesquisaModule { }
