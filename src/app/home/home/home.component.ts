import { Component } from '@angular/core';
import { AuthService } from '../../security/auth.service';
import { ActivityService } from '../../activities/activity.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
    private auth: AuthService,
    private activityService: ActivityService
  ){}

  login(){
    this.auth.login();
  }
}
