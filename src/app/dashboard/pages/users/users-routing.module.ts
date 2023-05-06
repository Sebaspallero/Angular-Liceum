import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersComponent
      },
      /* {
        path: ':id',
        component: StudentDetailComponent
      } */
    ])
  ],
  exports:[
    RouterModule
  ]
})
export class UsersRoutingModule { }
