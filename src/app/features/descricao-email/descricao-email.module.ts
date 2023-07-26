import { DescricaoEmailComponent } from './descricao-email.component';
import { HeaderBreadCrumbModule } from './../../shared/layout/header-breadcrumb/header-breadcrumb.module';
import { DescricaoEmailRoutingModule } from './descricao-email.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app//app.common.module';


@NgModule({
  imports: [
    CommonModule,
    DescricaoEmailRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    DescricaoEmailComponent
  ]
})
export class DescricaoEmailModule { }
