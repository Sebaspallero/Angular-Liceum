import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PageWrapperComponent } from './components/page-wrapper/page-wrapper.component';
import { StudentsModule } from './form/students/students.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { MainModule } from './components/main/main.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { StudentDetailModule } from './components/student-detail/student-detail.module';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageWrapperComponent,
  ],
  imports: [
    BrowserModule,
    StudentsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SidebarModule,
    MainModule,
    DashboardModule,
    StudentDetailModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
