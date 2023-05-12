import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Student } from 'src/app/core/models/students';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnDestroy {
  student: Student | any
  private destroyed$ = new Subject() 

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService
  ){

    this.usersService.getUserbyId(parseInt(activatedRoute.snapshot.params['id']))
    .pipe(takeUntil(this.destroyed$))
      .subscribe((student) => this.student = student)
  };

  ngOnDestroy(): void {
    this.destroyed$.next(true)
  };

  onDelete(): void{
    delete this.student?.course
    console.log(this.student)
  }
}
