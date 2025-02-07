import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../security/auth.service';
import { AnimalUserFilter, UserService } from '../user.service';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { Animal } from '../../core/model';
import { User } from '../../core/model';



@Component({
  selector: 'app-user-animal-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user-animal-list.component.html',
  styleUrls: ['./user-animal-list.component.css']
})
export class UserAnimalListComponent implements OnInit {
  animals: any[] = [];
  filteredAnimals: any[] = [];
  filters = {
    species: ''
  };

  constructor(private userService: UserService) { }

//   ngOnInit(): void {
//     this.loadAnimals();
//   }

  ngOnInit(): void {
      if (this.auth.isInvalidAccessToken()) {
        this.auth.login();
      }
      this.title.setTitle('Listagem de Animais');
      this.search();
    }

    search(page: number = 0): void {
      this.filter.user = new User().id = this.auth.jwtPayload?.user_id;
      this.filter.page = page;

      this.userService.searchAnimals(this.filter)
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

  requestAdoption(id: string): void {
      this.userService.requestAdoption(id).then(() => {
        this.messageService.add({ severity: 'success', detail: 'Solicitação de adoção enviada com sucesso!' });
        this.loadAnimals();
      });
    }
  }
}
