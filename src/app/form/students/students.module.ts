import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorHelpersModule } from 'src/app/shared/components/form-error-helpers/form-error-helpers.module';
import { MatIconModule } from '@angular/material/icon';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';



@NgModule({
  declarations: [
    StudentsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormErrorHelpersModule,
    MatIconModule,
    PipesModule,
    DirectivesModule
  ],
  exports:[
    StudentsComponent
  ]
})
export class StudentsModule { }
