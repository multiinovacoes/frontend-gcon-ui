import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NaturezaPesquisaRoutingModule } from 'src/app/features/natureza/natureza-pesquisa/natureza-pesquisa.routing';
import { NaturezaPesquisaComponent } from 'src/app/features/natureza/natureza-pesquisa/natureza-pesquisa.component';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';

@NgModule({
  imports: [
    CommonModule,
    NaturezaPesquisaRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    NaturezaPesquisaComponent
  ]
})
export class NaturezaPesquisaModule { }
