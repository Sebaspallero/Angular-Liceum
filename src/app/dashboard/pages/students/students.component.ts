import { Component, OnDestroy} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Student } from 'src/app/core/models/students';
import { StudentsService } from 'src/app/core/services/students.service';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentsComponent implements OnDestroy {

  studentsList: Student[] = [];
  private destroyed$ = new Subject() 

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService

  )
  {
    this.studentsForm = new FormGroup({
      name: this.nameControl,
      lastName: this.lastNameControl,
      email: this.emailControl,
      gender: this.genderControl,
      course: this.courseControl
    })

    this.studentsService.getStudents()
    .pipe(takeUntil(this.destroyed$))
      .subscribe((students)=> {
        this.studentsList = students
      })
  }

   ngOnDestroy(): void {
    this.destroyed$.next(true)
  };

  studentsForm: FormGroup;

  nameControl = new FormControl(
    '',
    [
      Validators.required,
      Validators.minLength(3)
    ]
  );

  lastNameControl = new FormControl( 
    '',
    [
      Validators.required
    ]
  );

  emailControl = new FormControl( 
    '',
    [
      Validators.required,
      Validators.email
    ]
  );

  genderControl = new FormControl( 
    '',
    [
      Validators.required,
    ]
  );

  courseControl = new FormControl(
    '',
    [
      Validators.required,
    ]
  )

  //AGREGAR ESTUDIANTE

  onSubmit():void{
    if(this.studentsForm.valid){
      this.studentsList.push({...this.studentsForm.value, id: Date.now(), role: 'student'});
      this.studentsForm.reset();
    }
    else{
      this.studentsForm.markAllAsTouched();
    }
    
  };

  //ELIMINAR ESTUDIANTE

  public isDeleted = false;

  public onDelete(id: number){
    //Animación de borrar => [class.deleted]="isDeleted == true"
    this.isDeleted = !this.isDeleted;
    //Borrar
    setTimeout(() => {
      const deletedUser = this.studentsList.filter(student => student.id !== id);
      this.studentsList = deletedUser
    }, 500);
  };

  //MOSTRAR DATOS DEL ESTUDIANTE EN FORM
  studentIndex!: number;
  isEditing: boolean | undefined;
  studentId: number | undefined;

  public onEdit(student: any, index:any){
    this.studentIndex = index
    this.studentId = student.id
    this.isEditing = true
    this.studentsForm.setValue(student)
    
  }

  //ACTUALIZAR DATOS DEL ESTUDIANTE
  public update() {
    if(this.studentsForm.valid){
      this.studentsList[this.studentIndex] = {...this.studentsForm.value, id: this.studentId}
      this.isEditing = false;
      this.studentsForm.reset();
    }
    else{
      this.studentsForm.markAllAsTouched();
    }
  }

  //NAVEGAR AL DETALLE DEL ESTUDIANTE

  navigateToDetail(studentId: number):void{
    this.router.navigate([studentId],{
      relativeTo: this.activatedRoute
    })
  }
}
