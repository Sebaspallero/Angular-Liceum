import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Course } from 'src/app/core/models/course';
import { CoursesService } from 'src/app/core/services/courses.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit, OnDestroy{

  private destroyed$ = new Subject() 
  coursesList: Course[] | undefined

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService
  )
  {
    this.coursesForm = new FormGroup({
      name: this.nameControl,
      startDate: this.startDateControl,
      endDate: this.endDateControl
    })

    const currentYear = new Date().getFullYear();
    this.minDate = new Date;
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  minDate: Date;
  maxDate: Date;

  ngOnInit(): void {
    this.coursesService.getCourses()
      .subscribe({
        next:((course) => {this.coursesList = course})
      })
  }

   ngOnDestroy(): void {
    this.destroyed$.next(true)
  };

  coursesForm: FormGroup;

  nameControl = new FormControl(
    '',
    [
      Validators.required,
      Validators.minLength(2)
    ]
  );

  startDateControl = new FormControl(
    '',
    [
      Validators.required,
    ]
  );

  endDateControl = new FormControl(
    '',
    [
      Validators.required,
    ]
  );

  //AGREGAR CURSO

  onSubmit():void{
    if(this.coursesForm.valid){
      this.coursesList?.push({...this.coursesForm.value, id: Date.now()});
      this.coursesForm.reset();
    }
    else{
      this.coursesForm.markAllAsTouched();
    }
  };

  //ELIMINAR CURSO

 public isDeleted = false;

  public onDelete(id: number){
    //Animación de borrar => [class.deleted]="isDeleted == true"
    this.isDeleted = !this.isDeleted;
    //Borrar
    setTimeout(() => {
      const deletedCourse = this.coursesList?.filter(course => course.id !== id);
      this.coursesList = deletedCourse
    }, 500);
  }; 

  //MOSTRAR DATOS DEL CURSO EN FORM
  courseIndex!: number;
  isEditing: boolean | undefined;
  courseId: number | any;

  public onEdit(course: any, index:any){
    this.courseIndex = index
    this.courseId = course.id
    this.isEditing = true
    this.coursesForm.setValue(course)
    console.log(this.coursesForm)
  }

  //ACTUALIZAR DATOS DEL ESTUDIANTE

   public update() {
    if(this.coursesForm.valid){
      this.courseId[this.courseIndex] = {...this.coursesForm.value, id: this.courseId}
      this.isEditing = false;
      this.coursesForm.reset();
    }
    else{
      this.coursesForm.markAllAsTouched();
    }
  } 

  //NAVEGAR AL DETALLE DEL ESTUDIANTE

   navigateToDetail(courseId: number):void{
    this.router.navigate([courseId],{
      relativeTo: this.activatedRoute
    })
  } 
}
