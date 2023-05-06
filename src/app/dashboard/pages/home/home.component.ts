import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Student } from 'src/app/core/models/students';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

 

export class HomeComponent implements OnDestroy {

  authUser$: Observable<Student | null>
  private destroyed$ = new Subject()

  constructor(
    private router: Router,
    private authService: AuthService,
  ){
    this.authUser$ = this.authService.getVerifiedStudent()
  }

  navigateToForm(): void {
    this.router.navigate(['dashboard', 'students'])
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  };
}
