import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Inscription } from '../models/inscription';


let inscriptionsMock: Inscription[] = [
  {
    id: 1,
    name: 'Sebastian',
    lastName: 'Pallero',
    course: 'Angular',
  },
  {
    id: 2,
    name: 'Marta',
    lastName: 'Fernandez',
    course: 'React',

  },
  {
    id: 3,
    name: 'Sebastian',
    lastName: 'Pallero',
    course: 'Vue',
  },
]

@Injectable({
  providedIn: 'root'
})


export class InscriptionsService {
  private inscription$ = new BehaviorSubject<Inscription[]>([]); 
  constructor() { }

  getInscription(): Observable<Inscription[]>{
    this.inscription$.next(inscriptionsMock)
    return this.inscription$.asObservable();
  }

  getInscriptionbyId(id: number): Observable<Inscription | undefined>{
    return this.inscription$.asObservable()
      .pipe(
        map((inscription)=> inscription.find((inscription)=> inscription.id === id))
      )
  };
}
