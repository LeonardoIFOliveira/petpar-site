import { Component } from '@angular/core';
import { Activity } from '../../core/model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { ActivityService } from '../activity.service';
import { AuthService } from '../../security/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-activity-register',
  templateUrl: './activity-register.component.html',
  styleUrl: './activity-register.component.css'
})
export class ActivityRegisterComponent {

  types = [
    { label: 'Caminhada', value: 'CAMINHADA' },
    { label: 'Ciclismo', value: 'CICLISMO' },
    { label: 'Corrida', value: 'CORRIDA' },
    { label: 'Natação', value: 'NATACAO' }
  ];

  activity = new Activity(this.auth.jwtPayload?.user_id);

  constructor(
    private activityService: ActivityService,
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.params[`id`];
    if(id !== undefined && id !== 'new'){
      this.loadActivity(id);
    }
    this.title.setTitle('Cadastro de Atividade');
  }

  get editing(): boolean {
    return Boolean(this.activity.id);
  }

  loadActivity(id: number) {
    this.activityService.findById(id)
      .then(activity => {
        this.activity = activity;
      })
      .catch(error => this.errorHandler.handle(error));
  }

  save(activityForm: NgForm){
    if(this.editing){
      this.updateActivity(activityForm);
    }else{
      this.addActivity(activityForm);
    }
  }

  updateActivity(activityForm: NgForm) {
    this.activityService.update(this.activity)
      .then( activity => {
        this.messageService.add({ severity: 'success', detail: 'Atividade editada com sucesso!' });
        this.activity = activity;
      })
      .catch(error => this.errorHandler.handle(error));
  }

  addActivity(activityForm: NgForm) {
    this.activityService.add(this.activity)
    .then(addedActivity => {
      this.messageService.add({ severity: 'success', detail: 'Atividade adicionada com sucesso!' });
      this.loadActivity(addedActivity.id);
      this.router.navigate(['/activities', addedActivity.id]);
    })
      .catch(error => this.errorHandler.handle(error));
  }

  new(activityForm: NgForm){
    this.activity = new Activity(this.auth.jwtPayload?.user_id);
    activityForm.reset();
    this.router.navigate(['/activities/new']);
  }

}

