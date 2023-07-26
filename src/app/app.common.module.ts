import { NgModule } from '@angular/core';
import { NgPrimeModule } from 'src/app/app.ngprime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMinDirective } from 'src/app/core/validators/custom-min-validator.directive';
import { CustomMaxDirective } from 'src/app/core/validators/custom-max-validator.directive';
import { ErrorComponent } from './shared/error/error.component';
import { MessageComponent } from './shared/message/message.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
      CommonModule
    ],
    exports: [
        NgPrimeModule,
        FormsModule,
        ReactiveFormsModule,
        MessageComponent


    ],
    declarations: [
        CustomMinDirective,
        CustomMaxDirective,
        ErrorComponent,
        MessageComponent

    ],
})
export class AppCommonModule {

}
