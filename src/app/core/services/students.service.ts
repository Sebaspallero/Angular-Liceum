import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Student } from '../models/students';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private students$ = new BehaviorSubject<Student[]>([])

  constructor(
    private httpClient: HttpClient
  ) { }

  get students(): Observable<Student[]>{
    return this.students$.asObservable()
  }

  getStudents(): void{
    this.httpClient.get<[Student]>(`http://localhost:3000/users?role=user`)
      .subscribe({
        next: (students) =>{
          this.students$.next(students)
        }
      })
  };

  //CAMBIAR A API (STUDENTS TAMBIEN)
  getStudentbyId(id: number): Observable<Student | undefined>{
    return this.students$.asObservable()
      .pipe(
        map((student)=> student.find((student)=> student.id === id))
      )
  };

  postStudentOnDb(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(`http://localhost:3000/users`, student)
  }

  deleteStudentOnDb(id:number): Observable<Student> {
    return this.httpClient.delete<Student>(`http://localhost:3000/users/${id}`)
  }

 updateStudentOnDb(student: Student): Observable<Student> {
    return this.httpClient.put<Student>(`http://localhost:3000/users/${student.id}`, student)
  }
}
