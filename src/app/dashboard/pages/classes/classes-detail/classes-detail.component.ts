import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Course } from 'src/app/core/models/course';
import { CoursesService } from 'src/app/core/services/courses.service';


@Component({
  selector: 'app-classes-detail',
  templateUrl: './classes-detail.component.html',
  styleUrls: ['./classes-detail.component.css']
})
export class ClassesDetailComponent {
  course: Course | any
  private destroyed$ = new Subject() 

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CoursesService
  ){

    this.courseService.getCoursebyId(parseInt(activatedRoute.snapshot.params['id']))
    .pipe(takeUntil(this.destroyed$))
      .subscribe((course) => this.course = course)
  };

  ngOnDestroy(): void {
    this.destroyed$.next(true)
  };

  onDelete(): void{
    delete this.course?.students
  }
}
