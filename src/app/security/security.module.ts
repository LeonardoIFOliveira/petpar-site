import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { AuthorizedComponent } from './authorized/authorized.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { IfitnessHttpInterceptor } from './ifitness-http-interceptor';

export function tokenGetter(): string {
  return localStorage.getItem('token')!;
}

@NgModule({
  declarations: [
    AuthorizedComponent
  ],
  imports: [
    CommonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: [ /localhost:8080/ ],
        disallowedRoutes: ['http://localhost:8080/oauth2/token', 'http://localhost:8080/users']
      }
    })
  ],
  providers: [
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: IfitnessHttpInterceptor,
      multi: true
    }
  ]
})
export class SecurityModule { }
