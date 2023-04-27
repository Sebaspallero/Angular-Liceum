import { Component } from '@angular/core';
import { generalLinks, settingsLinks } from './nav-items';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  
  constructor(
    private router: Router
  ){}

  logOut(): void {
    this.router.navigate(['auth', 'login'])
  }

  generalLinks = generalLinks;
  settingsLinks = settingsLinks;
  
}


