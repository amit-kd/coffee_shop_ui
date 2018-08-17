import { Component } from '@angular/core';
import { SharedService } from './shared/shared.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

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
      this.sharedService.refreshCart();
      this.sharedService.refreshEditedOrder();
    });

  }
}
