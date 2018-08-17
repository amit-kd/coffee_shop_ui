import { Component } from '@angular/core';
import { SharedService } from './shared/shared.service';
import { Router, NavigationEnd } from '../../node_modules/@angular/router';
import { filter } from '../../node_modules/rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'coffeeshop';
  constructor(private sharedService: SharedService, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.sharedService.refreshUserInfo();
    });

  }
}
