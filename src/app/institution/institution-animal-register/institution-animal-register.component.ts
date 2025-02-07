import { Component } from '@angular/core';
import { Activity } from '../../core/model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { InstitutionService } from '../institution.service';
import { AuthService } from '../../security/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Title } from '@angular/platform-browser';// Ajuste o caminho conforme a estrutura de sua aplicação

@Component({
  selector: 'app-institution-animal-register',
  templateUrl: './institution-animal-register.component.html',  // Coloque o caminho correto para o HTML
  imports: [
    FormsModule,
    RouterLink,
    HttpClientModule,
    CommonModule
  ],
  styleUrls: ['./institution-animal-register.component.css']  // Coloque o caminho correto para o CSS
})
export class InstitutionAnimalRegisterComponent {

  types = [
      { label: 'Caminhada', value: 'CAMINHADA' },
      { label: 'Ciclismo', value: 'CICLISMO' },
      { label: 'Corrida', value: 'CORRIDA' },
      { label: 'Natação', value: 'NATACAO' }
    ];

    animal = new Animal(this.auth.jwtPayload?.animal_id);

    constructor(
      private institutionService: InstitutionService,
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
      this.title.setTitle('Cadastro de Animal');
    }

    get editing(): boolean {
      return Boolean(this.animal.id);
    }

    loadAnimal(id: number) {
      this.institutionService.loadAnimalById(id)
        .then(animal => {
          this.animal = animal;
        })
        .catch(error => this.errorHandler.handle(error));
    }

    save(animalForm: NgForm){
      if(this.editing){
        this.updateActivity(animalForm);
      }else{
        this.addActivity(animalForm);
      }
    }

    updateAnimal(animalForm: NgForm) {
      this.institutionService.updateAnimal(this.animal)
        .then( animal => {
          this.messageService.add({ severity: 'success', detail: 'Registro de animal editado com sucesso!' });
          this.animal = animal;
        })
        .catch(error => this.errorHandler.handle(error));
    }

    addAnimal(animalForm: NgForm) {
      this.institutionService.addAnimal(this.activity)
      .then(addedActivity => {
        this.messageService.add({ severity: 'success', detail: 'Atividade adicionada com sucesso!' });
        this.loadAnimal(addedActivity.id);
        this.router.navigate(['/activities', addedActivity.id]);
      })
        .catch(error => this.errorHandler.handle(error));
    }

    new(animalForm: NgForm){
      this.animal = new Animal(this.auth.jwtPayload?.animal_id);
      animalForm.reset();
      this.router.navigate(['/animal/new']);
    }

}
