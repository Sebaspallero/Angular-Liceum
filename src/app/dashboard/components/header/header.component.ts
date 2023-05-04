import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Student } from 'src/app/core/models/students';
import { AuthService } from 'src/app/core/services/auth.service';
import { TimeService } from 'src/app/core/services/time.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements  OnDestroy {

  currentTime$: Observable<string>;
  authUser$: Observable<Student | null>
  private destroyed$ = new Subject() 

  constructor(
    private timeService: TimeService,
    private authService: AuthService
    ){
    this.currentTime$ = this.timeService.clock
    this.authUser$ = this.authService.getVerifiedStudent()
  }


  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  };
}
