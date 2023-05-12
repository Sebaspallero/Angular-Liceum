import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Student } from 'src/app/core/models/students';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnDestroy, OnInit {
  studentsList: Student[] = [];
  private destroyed$ = new Subject() ;
  authUser$: Observable<Student | null>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private authService: AuthService,
    )
  {
    this.authUser$ = this.authService.getVerifiedStudent()
  }

  ngOnInit(): void {
    this.usersService.users
      .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next:(users) =>{
            this.studentsList = users
          }
        })
    this.usersService.getUsers()
  }

   ngOnDestroy(): void {
      this.destroyed$.next(true)
      this.destroyed$.complete()
  };


  //ELIMINAR ESTUDIANTE
  selectedIndex = -1;

  public onDelete(id: number){
    this.selectedIndex = id;
    setTimeout(() => {
       this.usersService.deleteUserOnDb(id)
        .pipe(takeUntil(this.destroyed$))
         .subscribe({
          next: (response) =>{
            const deletedUser = this.studentsList.filter(student => student.id !== id);
            this.studentsList = deletedUser
          }
         })
    }, 1500);
  };


  //NAVEGAR AL DETALLE DEL ESTUDIANTE
  navigateToDetail(studentId: number):void{
    this.router.navigate([studentId],
    {
      relativeTo: this.activatedRoute
    })
  }
}

