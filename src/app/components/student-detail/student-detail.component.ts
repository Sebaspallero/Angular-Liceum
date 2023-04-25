import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from 'src/app/service/students.service';
import { Students} from '../../form/students/students.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})


export default class StudentDetailComponent implements OnDestroy {

  student: Students | undefined
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
}
