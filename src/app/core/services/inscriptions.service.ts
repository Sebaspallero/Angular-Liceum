import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Inscription } from '../models/inscription';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})


export class InscriptionsService {

  private inscription$ = new BehaviorSubject<Inscription[]>([]); 

  constructor(
    private httpClient: HttpClient
  ) { }

  get inscriptions(): Observable<Inscription[]>{
    return this.inscription$.asObservable()
  }

  getInscriptions(): void{
    this.httpClient.get<[Inscription]>(`http://localhost:3000/inscriptions`)
      .subscribe({
        next: (inscription) =>{
          this.inscription$.next(inscription)
        }
      })
  };

  getInscriptionbyId(id: number): Observable<Inscription | undefined>{
    return this.inscription$.asObservable()
      .pipe(
        map((inscription)=> inscription.find((inscription)=> inscription.id === id))
      )
  };

  postInscriptionOnDb(inscription: Inscription): Observable<Inscription> {
    return this.httpClient.post<Inscription>(`http://localhost:3000/inscriptions`, inscription)
  }

  deleteInscriptionOnDb(id:number): Observable<Inscription> {
    return this.httpClient.delete<Inscription>(`http://localhost:3000/inscriptions/${id}`)
  }

 updateInscriptionOnDb(inscription: Inscription): Observable<Inscription> {
    return this.httpClient.put<Inscription>(`http://localhost:3000/inscriptions/${inscription.id}`, inscription)
  }
}
