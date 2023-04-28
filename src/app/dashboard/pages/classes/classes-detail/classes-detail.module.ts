import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesDetailComponent } from './classes-detail.component';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
  declarations: [
    ClassesDetailComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports:[
    ClassesDetailComponent
  ]
})
export class ClassesDetailModule { }
