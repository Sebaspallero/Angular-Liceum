import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Inscription } from 'src/app/core/models/inscription';
import { Student } from 'src/app/core/models/students';
import { AuthService } from 'src/app/core/services/auth.service';
import { InscriptionsService } from 'src/app/core/services/inscriptions.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnDestroy, OnInit {

  private destroyed$ = new Subject();
  authUser$: Observable<Student | null>;
  inscriptionList: Inscription[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private inscriptionService: InscriptionsService,
    private authService: AuthService

  )
  {
    this.inscriptionForm = new FormGroup({
      name: this.nameControl,
      lastName: this.lastNameControl,
      course: this.courseControl
    })
    
    this.authUser$ = this.authService.getVerifiedStudent()
  }

  ngOnInit(): void {
    this.inscriptionService.inscriptions
      .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next:(inscriptions) =>{
            this.inscriptionList = inscriptions
          }
        })
    this.inscriptionService.getInscriptions()
  }

   ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete()
  };

  inscriptionForm: FormGroup;

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
      Validators.required,
    ]
  );

  courseControl = new FormControl(
    '',
    [
      Validators.required,
    ]
  )

  //AGREGAR INSCRIPCIÓN
  onSubmit():void{
    if(this.inscriptionForm.valid){
      this.inscriptionService.postInscriptionOnDb({...this.inscriptionForm.value})
      .pipe(takeUntil(this.destroyed$))
        .subscribe(
          inscription => this.inscriptionList.push(inscription)
        )
        this.inscriptionForm.reset();
    }
    else{
      this.inscriptionForm.markAllAsTouched();
    }
  };


  //ELIMINAR INSCRIPCIÓN
  selectedIndex = -1

  public onDelete(id: number){
    this.selectedIndex = id
    setTimeout(() => {
      this.inscriptionService.deleteInscriptionOnDb(id)
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: (response) =>{
            const deletedInscription = this.inscriptionList.filter(inscription => inscription.id !== id);
            this.inscriptionList = deletedInscription
          }
         })
    }, 1500);
  };

  //MOSTRAR DATOS DE LA INSCRIPCIÓN EN FORM
  inscriptionIndex!: number;
  isEditing: boolean | undefined;
  inscriptionId: number | undefined;

  public onEdit(inscription: any, index:any){
    this.inscriptionIndex = index
    this.inscriptionId = inscription.id
    this.isEditing = true

    this.nameControl.setValue(inscription.name)
    this.lastNameControl.setValue(inscription.lastName)
    this.courseControl.setValue(inscription.course)
    
  }

  //ACTUALIZAR DATOS DE LA INSCRIPCIÓN
  public update() {
    if(this.inscriptionForm.valid){
      this.inscriptionService.updateInscriptionOnDb({...this.inscriptionForm.value, id: this.inscriptionId})
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next:(response) =>{
            this.inscriptionList[this.inscriptionIndex] = response
            this.isEditing = false;
            this.inscriptionForm.reset();
          }}) 
      } 
    else{
      this.inscriptionForm.markAllAsTouched();
    }
  } 
  
  //NAVEGAR AL DETALLE DE LA INSCRIPCIÓN
  navigateToDetail(inscriptionId: number):void{
    this.router.navigate([inscriptionId],{
      relativeTo: this.activatedRoute
    })
  }
}

