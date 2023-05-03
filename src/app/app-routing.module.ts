import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { StudentsComponent } from './dashboard/pages/students/students.component';
import StudentDetailComponent from './dashboard/pages/students/student-detail/student-detail.component';
import { ClassesComponent } from './dashboard/pages/classes/classes.component';
import { ClassesDetailComponent } from './dashboard/pages/classes/classes-detail/classes-detail.component';
import { InscriptionComponent } from './dashboard/pages/inscription/inscription.component';
import { InscriptionDetailComponent } from './dashboard/pages/inscription/inscription-detail/inscription-detail.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
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
    redirectTo: 'dashboard'
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
