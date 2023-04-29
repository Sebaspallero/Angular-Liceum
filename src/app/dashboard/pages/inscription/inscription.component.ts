import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Inscription } from 'src/app/core/models/inscription';
import { InscriptionsService } from 'src/app/core/services/inscriptions.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnDestroy {

  inscriptionList: Inscription[] = [];
  private destroyed$ = new Subject() 

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private inscriptionService: InscriptionsService

  )
  {
    this.inscriptionForm = new FormGroup({
      name: this.nameControl,
      lastName: this.lastNameControl,
      course: this.courseControl
    })

    this.inscriptionService.getInscription()
    .pipe(takeUntil(this.destroyed$))
      .subscribe((inscription)=> {
        this.inscriptionList = inscription
      })
  }

   ngOnDestroy(): void {
    this.destroyed$.next(true)
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
      this.inscriptionList.push({...this.inscriptionForm.value, id: Date.now()});
      console.log(this.inscriptionForm.value)
      this.inscriptionForm.reset();
      
    }
    else{
      this.inscriptionForm.markAllAsTouched();
    }
    
  };

  //ELIMINAR INSCRIPCIÓN

  public isDeleted = false;

  public onDelete(id: number){
    //Animación de borrar => [class.deleted]="isDeleted == true"
    this.isDeleted = !this.isDeleted;
    //Borrar
    setTimeout(() => {
      const deletedUser = this.inscriptionList.filter(inscription => inscription.id !== id);
      this.inscriptionList = deletedUser
    }, 500);
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
      this.inscriptionList[this.inscriptionIndex] = {...this.inscriptionForm.value, id: this.inscriptionId}
      this.isEditing = false;
      this.inscriptionForm.reset();
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

