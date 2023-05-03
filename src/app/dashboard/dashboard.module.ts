import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ClassesModule } from './pages/classes/classes.module';
import { HeaderModule } from './components/header/header.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { AppRoutingModule } from '../app-routing.module';
import { HomeModule } from './pages/home/home.module';
import { StudentsModule } from './pages/students/students.module';
import { InscriptionModule } from './pages/inscription/inscription.module';
import { RouterModule } from '@angular/router';
import { StudentsComponent } from './pages/students/students.component';
import StudentDetailComponent from './pages/students/student-detail/student-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { ClassesDetailComponent } from './pages/classes/classes-detail/classes-detail.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { InscriptionDetailComponent } from './pages/inscription/inscription-detail/inscription-detail.component';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HomeModule,
    ClassesModule,
    StudentsModule,
    HeaderModule,
    SidebarModule,
    InscriptionModule,
    RouterModule.forChild([
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
      },
      {
        path: 'inscriptions',
        children:[
          {
            path: '',
            component: InscriptionComponent
          },
          {
            path:':id',
            component: InscriptionDetailComponent
          }
        ]
      }
    ])
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
