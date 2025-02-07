import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { InstitutionService } from '../institution.service';
import { Institution } from '../../core/model';
@Component({
  selector: 'app-institution-register',
  templateUrl: './institution-register.component.html',
  styleUrl: './institution-register.component.css'
})
export class InstitutionRegisterComponent {

  institution = new Institution();

  constructor(
    private institutionService: InstitutionService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private router: Router,
    private title: Title
  ){}

  ngOnInit(): void {
    this.title.setTitle('Cadastro de Instituição');
  }

  save(institutionForm: NgForm) {
    this.institutionService.add(this.institution)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Usuário adicionado com sucesso!' });
        this.router.navigate(['/home']);
      })
      .catch(error => this.errorHandler.handle(error));
  }
}
