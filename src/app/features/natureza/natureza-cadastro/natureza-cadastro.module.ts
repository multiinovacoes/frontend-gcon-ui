import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NaturezaCadastroRoutingModule } from 'src/app/features/natureza/natureza-cadastro/natureza-cadastro.routing';
import { NaturezaCadastroComponent } from 'src/app/features/natureza/natureza-cadastro/natureza-cadastro.component';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';

@NgModule({
  imports: [
    CommonModule,
    NaturezaCadastroRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    NaturezaCadastroComponent
  ]
})
export class NaturezaCadastroModule { }
