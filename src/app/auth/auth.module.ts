import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginModule } from './pages/login/login.module';
import { AppRoutingModule } from 'src/app/app-routing.module';




@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    LoginModule,
    AppRoutingModule
  ],
  exports:[
    AuthComponent
  ]
})
export class AuthModule { }
