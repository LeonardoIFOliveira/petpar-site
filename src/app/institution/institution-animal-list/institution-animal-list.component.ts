import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../security/auth.service';
import { InstitutionAnimalFilter, InstitutionService } from '../institution.service';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { Animal } from '../../core/model';
import { Institution } from '../../core/model';

@Component({
  selector: 'app-institution-animal-list',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './institution-animal-list.component.html',
  styleUrls: ['./institution-animal-list.component.css']
})
export class InstitutionAnimalListComponent implements OnInit {
  animals: any[] = [];
  filteredAnimals: any[] = [];
  filters = {
    institution: '',
    statusAdoption: '',
    species: '',
//     startDate: '',
//     endDate: ''
  };
  totalRecords: number = 0;

  filter = new InstitutionAnimalFilter();

  constructor(private institutionService: InstitutionService) { }

  ngOnInit(): void {
    if (this.auth.isInvalidAccessToken()) {
      this.auth.login();
    }
    this.title.setTitle('Listagem de Animais');
    this.searchAnimals();
  }

  searchAnimals(page: number = 0): void {
      this.filter.institution = new Institution().id = this.auth.jwtPayload?.institution_id;
      this.filter.page = page;

      this.activityService.search(this.filter)
        .then((result: any) => {
          this.animals = result.animals;
          this.totalRecords = result.total;
        })
        .catch(error => this.errorHandler.handle(error));

  }

  whenChangePage(event: LazyLoadEvent) {
    const page = event!.first! / event!.rows!;
    this.search(page);
  }

  confirmRemoval(animal: any): void {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.removeAnimal(id);
      }
    });
  }

  remove(id: any): void {
    this.activityService.removeAnimal(id)
      .then(() => {
        this.search();
        this.messageService.add({ severity: 'success', detail: 'Animal excluído com sucesso!' });
      })
      .catch(error => this.errorHandler.handle(error));
  }
}
