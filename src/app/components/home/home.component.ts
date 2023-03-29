import { Component } from '@angular/core';
import { student } from '../../models/students';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public students: student[] = [
    new student(1, "María", "Pérez", "mariaperez@gmail.com", 24, 'female', new Date('1999-05-20')),
    new student(2, "Felipe", "Ventti", "feventti@gmail.com", 23, 'male', new Date('2000-07-04')),
    new student(3, "Luis", "Sagaspi", "luiggisagaspi@gmail.com", 18, 'male', new Date('2005-11-26')),
    new student(4, "Pablo", "Roca", "rocapablo@gmail.com", 25, 'male', new Date('1998-03-02')),
    new student(5, "Fernanada", "Amado", "feramado@gmail.com", 20, 'female', new Date('2003-07-10')),
  ]
}
