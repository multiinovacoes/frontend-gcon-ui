import { AssuntoPesquisaRoutingModule } from './assunto-pesquisa.routing';
import { AssuntoPesquisaComponent } from './assunto-pesquisa.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';

@NgModule({
  imports: [
    CommonModule,
    AssuntoPesquisaRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    AssuntoPesquisaComponent
  ]
})
export class AssuntoPesquisaModule { }
