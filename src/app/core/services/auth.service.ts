import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Student } from '../models/students';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


 export interface loginFormValue {
      email: string,
      password: string
 }

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUser$ = new BehaviorSubject<Student | null>(null)

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  getVerifiedStudent(): Observable<Student | null> {
    return this.authUser$.asObservable()
  }

  login(formValue: loginFormValue): void{
    this.httpClient.get<[Student]>(`http://localhost:3000/users`,
          {
            params:{
              ...formValue
            }
          }
        ).subscribe({
          next: (users) => {
            const authUser = users[0];
            if(authUser){
              localStorage.setItem('token', authUser.token)
              this.authUser$.next(authUser);
              this.router.navigate(['dashboard', 'home'])
            }
            else{
              alert('Usuario y/o contraseña incorrectos')
            }
          }
        })
  };

  logOut(): void {
    localStorage.removeItem('token');
    this.authUser$.next(null);
    this.router.navigate(['auth'])
  }

  verifyToken(): Observable<boolean> {

    const token = localStorage.getItem('token');

    return this.httpClient.get<[Student]>(`http://localhost:3000/users?token=${token}`)
    .pipe(
      map((users)=> {
        const authUser = users[0];
        if(authUser){
          localStorage.setItem('token', authUser.token)
          this.authUser$.next(authUser);
        }
        return !!authUser
      })
    )
  };
}
