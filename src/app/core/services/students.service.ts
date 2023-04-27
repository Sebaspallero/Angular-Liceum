import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Students } from '../models/students';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private students$ = new BehaviorSubject<Students[]>(
    [
      {
        name:'Sebastian',
        lastName:'Pallero',
        email:'sebastian@emalil.com',
        gender:'M',
        course:'Angular',
        id: Date.now()
      }
    ]
  )

  constructor() { }

  getStudents(): Observable<Students[]>{
      return this.students$.asObservable()
  };

  getStudentbyId(id: number): Observable<Students | undefined>{
    return this.students$.asObservable()
      .pipe(
        map((student)=> student.find((student)=> student.id === id))
      )
  };
}
