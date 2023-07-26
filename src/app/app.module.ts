import { ExcelServiceService } from './core/services/excel-service.service';
import { AppCommonModule } from 'src/app/app.common.module';
import { NgxLoadingModule } from 'ngx-loading';
import { GconHttpInterceptor } from './features/seguranca/http-interceptor';
import { environment } from 'src/environments/environment';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
// angular default
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



// Prime NG
import { ConfirmationService, MessageService } from 'primeng/api';
// app related
import { AppComponent } from 'src/app/app.component';
import { AuthGuard } from 'src/app/core/gaurds/auth.gaurd';
import { AppRoutingModule } from 'src/app/app.routing.module';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { MenuComponent } from 'src/app/shared/layout/menu/menu.component';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';
import { FooterComponent } from 'src/app/shared/layout/footer/footer.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';






export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function getToken(): string {
  return localStorage.getItem('token');
}

import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UserDataService } from './features/seguranca/user-data.service';
import { UserIdleModule } from 'angular-user-idle';



registerLocaleData(localeBr, 'ptBr');


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    NgxLoadingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ConfirmDialogModule,
        UserIdleModule.forRoot({ idle: 1, timeout: 18000, ping: null }),
    HttpClientModule,
    AppCommonModule,
    JwtModule.forRoot({
      config: {
          tokenGetter: getToken,
          allowedDomains: environment.tokenAllowedDomains,
          disallowedRoutes: environment.tokenDisallowedRoutes
        }
  }),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [TranslateModule],
  providers: [
    MessageService,
    AuthGuard,
    ConfirmationService,
    UserDataService,
    JwtHelperService,
    ExcelServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GconHttpInterceptor,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'ptBr' }
  
    //AuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
