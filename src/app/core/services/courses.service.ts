import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Course } from '../models/course';



let CoursesMock: Course[] = [
  {
    id: 1,
    name: 'Angular',
    startDate: new Date(),
    endDate: new Date(),
    students: { name:'Sebastian', lastName:'Pallero',}
  },
  {
    id: 2,
    name: 'React',
    startDate: new Date(),
    endDate: new Date(),
    students: { name:'Sebastian', lastName:'Pallero',}

  },
  {
    id: 3,
    name: 'Vue',
    startDate: new Date(),
    endDate: new Date(),
    students: { name:'Sebastian', lastName:'Pallero',}
  },
]


@Injectable({
  providedIn: 'root'
})

export class CoursesService {

  private course$ = new BehaviorSubject<Course[]>([]); 
  constructor() { }

  getCourses(): Observable<Course[]>{
    this.course$.next(CoursesMock)
    return this.course$.asObservable();
  }

  getCoursebyId(id: number): Observable<Course | undefined>{
    return this.course$.asObservable()
      .pipe(
        map((course)=> course.find((course)=> course.id === id))
      )
  };
}