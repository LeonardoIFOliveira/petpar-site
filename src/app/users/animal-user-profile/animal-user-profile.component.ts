import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { AnimalAdoption,UserService } from '../user.service';
import { User } from '../../core/model';
import { Animal } from '../../core/model';

@Component({
  selector: 'app-animal-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // Adicionei os módulos necessários
  templateUrl: './animal-user-profile.component.html',
  styleUrls: ['./animal-user-profile.component.css']
})
export class AnimalUserProfileComponent implements OnInit {
  animal: Animal;
  isLoading: boolean = true;
  errorMessage: string = ''; // Propriedade faltante

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params[`id`];
    if (!id) {
      this.errorMessage = 'ID do animal não encontrado na URL';
      this.isLoading = false;
      return;
    }
    this.loadAnimal(id)
    this.title.setTitle('Cadastro de Animal');
  }

  get editing(): boolean {
    return Boolean(this.animal.id);
  }

  loadAnimal(id: number) {
    this.userService.loadAnimal(id)
      .then(animal => {
        this.animal = animal;
        this.isLoading = false;
      })
      .catch(error => this.errorHandler.handle(error));
  }

  solicitarAdocao(adoption: AnimalAdoption): void {
    //id = this.route.snapshot.params[`user_id`];
    this.isLoading = true;
    this.userService.solicitarAdocao(adoption).subscribe({
      next: () => {
        this.isLoading = false;
        alert('Solicitação de adoção enviada com sucesso!');
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Erro ao solicitar adoção';
        console.error('Erro:', err);
      }
    });
  }
}
