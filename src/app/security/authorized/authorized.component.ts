import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrl: './authorized.component.css'
})
export class AuthorizedComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private route: Router
  ){}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params:any) => {
      if (params.code) {
        this.auth.getNewAccessTokenWithCode(params.code, params.state)
          .then(()=> {
            this.route.navigate(['/activities'])
          })
          .catch((e:any) => {
            console.error('Erro no callback', e)
          });
      } else {
        this.route.navigate(['/']);
      }
    })
  }

}
