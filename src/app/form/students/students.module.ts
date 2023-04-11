import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorHelpersModule } from 'src/app/shared/components/form-error-helpers/form-error-helpers.module';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    StudentsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormErrorHelpersModule,
    MatIconModule
  ],
  exports:[
    StudentsComponent
  ]
})
export class StudentsModule { }
