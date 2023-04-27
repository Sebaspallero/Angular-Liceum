import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeService } from 'src/app/core/services/time.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  currentTime$: Observable<string>;

  constructor(private timeService: TimeService){
    this.currentTime$ = this.timeService.clock
  }
}
