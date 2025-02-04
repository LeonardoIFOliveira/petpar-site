import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ifitness-ui';

  constructor(private router: Router){}

  showingNavbar(): boolean {
    return this.router.url !== '/home' && this.router.url !== '/users/new';
  }
}
