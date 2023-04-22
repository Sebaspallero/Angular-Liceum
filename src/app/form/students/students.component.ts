import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface student{
  name: string,
  lastName: string,
  email: string,
  gender: string,
  course: string,
  id: number
}

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentsComponent {

  studentsList: student[] = [
    {
      name:'Sebastian',
      lastName:'Pallero',
      email:'sebastian@emalil.com',
      gender:'M',
      course:'Angular',
      id: Date.now()
    }
  ];

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

  constructor(){
    this.studentsForm = new FormGroup({
      name: this.nameControl,
      lastName: this.lastNameControl,
      email: this.emailControl,
      gender: this.genderControl,
      course: this.courseControl
    })
  }

  //AGREGAR ESTUDIANTE

  onSubmit():void{
    if(this.studentsForm.valid){
      this.studentsList.push({...this.studentsForm.value, id: Date.now()});
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
}
