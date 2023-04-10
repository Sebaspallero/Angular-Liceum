import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {

  studentsList: any[] = [];

  studentsForm: FormGroup;

  nameControl = new FormControl(
    'sebstian',
    [
      Validators.required,
      Validators.minLength(3)
    ]
  );

  lastNameControl = new FormControl( 
    'pallero',
    [
      Validators.required
    ]
  );

  emailControl = new FormControl( 
    'sebastianoria@hotmail.com',
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
      /* this.studentsForm.reset(); */
    }
    else{
      this.studentsForm.markAllAsTouched();
    }
    
  }

  public delete(event: any, id: number){
     let students = this.studentsList
    const deletedUser = students.filter(student => student.id !== id);
    students = deletedUser
  }


}
