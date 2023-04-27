import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './dashboard/pages/students/students.component';
import { HomeComponent } from './dashboard/pages/home/home.component';
import StudentDetailComponent from './dashboard/pages/students/student-detail/student-detail.component';
import { ClassesComponent } from './dashboard/pages/classes/classes.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClassesDetailComponent } from './dashboard/pages/classes/classes-detail/classes-detail.component';



const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
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
        component: HomeComponent
      },
      {
        path: 'classes',
        children:[
          {
            path: '',
            component: ClassesComponent
          },
          {
            path:':id',
            component: ClassesDetailComponent
          }
        ]
       
      }
    ]
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
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
