import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../security/auth.service';
import { ActivityFilter, ActivityService } from '../activity.service';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { User } from '../../core/model';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrl: './activities-list.component.css'
})
export class ActivitiesListComponent implements OnInit {

  type?: string;
  initialDate?: Date;
  finalDate?: Date;

  activities = [];

  totalRecords: number = 0;

  filter = new ActivityFilter();

  types = [
    { label: 'Caminhada', value: 'CAMINHADA' },
    { label: 'Ciclismo', value: 'CICLISMO' },
    { label: 'Corrida', value: 'CORRIDA' },
    { label: 'Natação', value: 'NATACAO' }
  ];

  constructor(
    private auth: AuthService,
    private activityService: ActivityService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ){}

  ngOnInit(): void {
    if (this.auth.isInvalidAccessToken()) {
      this.auth.login();
    }
    this.title.setTitle('Listagem de Atividades');
    this.search();
  }

  search(page: number = 0): void {
    this.filter.user = new User().id = this.auth.jwtPayload?.user_id;
    this.filter.page = page;

    this.activityService.search(this.filter)
      .then((result: any) => {
        this.activities = result.activities;
        this.totalRecords = result.total;
      })
      .catch(error => this.errorHandler.handle(error));

  }

  whenChangePage(event: LazyLoadEvent) {
    const page = event!.first! / event!.rows!;
    this.search(page);
  }

  confirmRemoval(activity: any): void {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.remove(activity);
      }
    });
  }

  remove(activity: any): void {
    this.activityService.remove(activity.id)
      .then(() => {
        this.search();
        this.messageService.add({ severity: 'success', detail: 'Atividade excluída com sucesso!' });
      })
      .catch(error => this.errorHandler.handle(error));
  }

}
