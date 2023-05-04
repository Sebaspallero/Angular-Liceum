import { Component } from '@angular/core';
import { generalLinks, settingsLinks } from './nav-items';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  
  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  logOut(): void {
    this.authService.logOut()
  }

  generalLinks = generalLinks;
  settingsLinks = settingsLinks;
  
}


