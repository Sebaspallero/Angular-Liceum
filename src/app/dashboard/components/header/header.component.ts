import { Component, OnDestroy, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Student } from 'src/app/core/models/students';
import { AuthService } from 'src/app/core/services/auth.service';
import { TimeService } from 'src/app/core/services/time.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements  OnDestroy {

  @Input() title: string = '';

  currentTime$: Observable<string>;
  authUser$: Observable<Student | null>
  private destroyed$ = new Subject() 

  constructor(
    private timeService: TimeService,
    private authService: AuthService,
    private router:  Router
    ){
    this.currentTime$ = this.timeService.clock
    this.authUser$ = this.authService.getVerifiedStudent()
    router.events.subscribe( (event) => ( event instanceof NavigationEnd ) && this.handleRouteChange() )
    
  }

  variableTitle: string = ''

  handleRouteChange(): void {
    if(this.router.url.includes('students')){
     
    }
  };

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  };
}
