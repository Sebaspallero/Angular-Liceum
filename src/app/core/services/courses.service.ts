import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Course } from '../models/course';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class CoursesService {


  private course$ = new BehaviorSubject<Course[]>([]); 

  constructor(
    private httpClient: HttpClient
  ) {}

  
  get courses(): Observable<Course[]>{
    return this.course$.asObservable()
  }

  getCourses(): void{
    this.httpClient.get<[Course]>(`http://localhost:3000/courses`)
      .subscribe({
        next: (course) =>{
          this.course$.next(course)
        }
      })
  };

  getCoursebyId(id: number): Observable<Course | undefined>{
    return this.course$.asObservable()
      .pipe(
        map((course)=> course.find((course)=> course.id === id))
      )
  };

  postCourseOnDb(course: Course): Observable<Course> {
    return this.httpClient.post<Course>(`http://localhost:3000/courses`, course)
  }

  deleteCourseOnDb(id:number): Observable<Course> {
    return this.httpClient.delete<Course>(`http://localhost:3000/courses/${id}`)
  }

 updateCourseOnDb(course: Course): Observable<Course> {
    return this.httpClient.put<Course>(`http://localhost:3000/courses/${course.id}`, course)
  }
}
