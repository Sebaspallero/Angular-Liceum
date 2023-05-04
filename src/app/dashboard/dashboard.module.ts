import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { HeaderModule } from './components/header/header.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { HomeModule } from './pages/home/home.module';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    HomeModule,
    HeaderModule,
    SidebarModule,
    RouterModule.forChild([
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'students',
        loadChildren: () => import("./pages/students/students.module").then((m) => m.StudentsModule), 
      },
      {
        path: 'classes',
        loadChildren: () => import("./pages/classes/classes.module").then((m) => m.ClassesModule), 
      },
      {
        path: 'inscriptions',
        loadChildren: () => import("./pages/inscription/inscription.module").then((m) => m.InscriptionModule),
      }
    ])
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
