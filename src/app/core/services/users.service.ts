import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Student } from '../models/students';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users$ = new BehaviorSubject<Student[]>([])

  constructor(
    private httpClient: HttpClient
  ) { }

  get users(): Observable<Student[]>{
    return this.users$.asObservable()
  }

  getUsers(): void{
    this.httpClient.get<[Student]>(`http://localhost:3000/users`)
      .subscribe({
        next: (users) =>{
          this.users$.next(users)
        }
      })
  };

  
  getUserbyId(id: number): Observable<Student | undefined>{
    return this.users$.asObservable()
      .pipe(
        map((user)=> user.find((user)=> user.id === id))
      )
  };

  postUserOnDb(user: Student): Observable<Student> {
    return this.httpClient.post<Student>(`http://localhost:3000/users`, user)
  }

  deleteUserOnDb(id:number): Observable<Student> {
    return this.httpClient.delete<Student>(`http://localhost:3000/users/${id}`)
  }

 updateUsertOnDb(user: Student): Observable<Student> {
    return this.httpClient.put<Student>(`http://localhost:3000/users/${user.id}`, user)
  }
}
