import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './form/students/students.component';
import { PageWrapperComponent } from './components/page-wrapper/page-wrapper.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import StudentDetailComponent from './components/student-detail/student-detail.component';



const routes: Routes = [
  {
    path: 'dashboard',
    component: PageWrapperComponent,
    children: [
      {
        path: 'students',
        children:[
          {
            path: '',
            component: StudentsComponent
          },
          {
            path: ':id',
            component: StudentDetailComponent
          }
        ]
      },
      {
        path: 'home',
        component: DashboardComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard/home'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
