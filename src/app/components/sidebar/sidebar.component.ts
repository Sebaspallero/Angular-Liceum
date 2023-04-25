import { Component } from '@angular/core';
import { generalLinks, settingsLinks } from './nav-items';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  generalLinks = generalLinks;
  settingsLinks = settingsLinks;
  
}
