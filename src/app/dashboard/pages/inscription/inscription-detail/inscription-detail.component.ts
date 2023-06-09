import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Inscription } from 'src/app/core/models/inscription';
import { InscriptionsService } from 'src/app/core/services/inscriptions.service';


@Component({
  selector: 'app-inscription-detail',
  templateUrl: './inscription-detail.component.html',
  styleUrls: ['./inscription-detail.component.css']
})
export class InscriptionDetailComponent implements OnDestroy{

  inscription: Inscription | any
  private destroyed$ = new Subject() 

  constructor(
    private activatedRoute: ActivatedRoute,
    private inscriptionService: InscriptionsService
  ){

    this.inscriptionService.getInscriptionbyId(parseInt(activatedRoute.snapshot.params['id']))
    .pipe(takeUntil(this.destroyed$))
      .subscribe((inscription) => this.inscription = inscription)
  };

  ngOnDestroy(): void {
    this.destroyed$.next(true)
  };

  /* onDelete(): void{
    delete this.student?.course
    console.log(this.student)
  } */
}

