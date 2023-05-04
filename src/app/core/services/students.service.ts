import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Student } from '../models/students';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private students$ = new BehaviorSubject<Student[]>(
    [
      {
        name:'Max',
        lastName:'Powers',
        email:'maxpowers@emalil.com',
        gender:'M',
        course:'Angular',
        role: 'Student',
        id: Date.now()
      }
    ]
  )

  constructor() { }

  getStudents(): Observable<Student[]>{
      return this.students$.asObservable()
  };

  getStudentbyId(id: number): Observable<Student | undefined>{
    return this.students$.asObservable()
      .pipe(
        map((student)=> student.find((student)=> student.id === id))
      )
  };
}
