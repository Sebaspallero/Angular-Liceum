import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ClassesModule } from './pages/classes/classes.module';
import { HeaderModule } from './components/header/header.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { AppRoutingModule } from '../app-routing.module';
import { HomeModule } from './pages/home/home.module';
import { StudentsModule } from './pages/students/students.module';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HomeModule,
    ClassesModule,
    StudentsModule,
    HeaderModule,
    SidebarModule,
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
