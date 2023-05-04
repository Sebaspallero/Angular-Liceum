import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../models/students';
import { Router } from '@angular/router';


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
    private router: Router
  ) { }

  getVerifiedStudent(): Observable<Student | null> {
    return this.authUser$.asObservable()
  }

  login(formValue: loginFormValue): void{

    const user = {
      id: 1,
      name: 'Sebastián',
      lastName: 'Pallero',
      gender: 'M',
      role: 'Admin',
      email: formValue.email
    }
    localStorage.setItem('auth-user', JSON.stringify(user));
    this.authUser$.next(user);
    this.router.navigate(['dashboard/home'])
  };

  logOut(): void {
    localStorage.removeItem('auth-user');
    this.authUser$.next(null);
    this.router.navigate(['auth'])
  }

  verifyStorage(): void {
    const storageValue = localStorage.getItem('auth-user');
    if(storageValue){
      const user = JSON.parse(storageValue);
      this.authUser$.next(user)
    }else{
      return
    }
  }
}
