import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {

  studentsList: any[] = [
    {
      name:'sebastian',
      lastName:'pallero',
      email:'sebastian@emalil.com',
      gender:'M',
      course:'Angular',
      id: 1
    },
    {
      name:'Maria',
      lastName:'Perez',
      email:'maria@emalil.com',
      gender:'F',
      course:'React',
      id: 2
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

  onSubmit():void{
    if(this.studentsForm.valid){
      this.studentsList.push({...this.studentsForm.value, id: Date.now()});
      this.studentsForm.reset();
    }
    else{
      this.studentsForm.markAllAsTouched();
    }
    
  };

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


  studentId: any;
  isEditing = false;

  //MOSTRAR DATOS DEL ESTUDIANTE EN FORM
  public onEdit(student: any, id:number){
    this.studentId = id
    this.isEditing = !this.isEditing
    this.studentsForm.setValue(student)
  }

  //ACTUALIZAR DATOS DEL ESTUDIANTE
  public update() {
    this.studentsList[this.studentId] = this.studentsForm.value
    this.isEditing = !this.isEditing
    this.studentsForm.reset();
  }

 
}
