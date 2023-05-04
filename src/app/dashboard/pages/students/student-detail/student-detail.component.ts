import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from 'src/app/core/services/students.service';
import { Subject, takeUntil } from 'rxjs';
import { Student } from 'src/app/core/models/students';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})


export default class StudentDetailComponent implements OnDestroy {

  student: Student | any
  private destroyed$ = new Subject() 

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService
  ){

    this.studentsService.getStudentbyId(parseInt(activatedRoute.snapshot.params['id']))
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
