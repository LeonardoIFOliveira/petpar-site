import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-institution-animal-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './institution-animal-list.component.html',
  styleUrls: ['./institution-animal-list.component.css']
})
export class InstitutionAnimalListComponent implements OnInit {
  animals: any[] = [];
  filteredAnimals: any[] = [];
  filters = {
    statusAdoption: '',
    species: '',
    startDate: '',
    endDate: ''
  };

  constructor(private animalService: AnimalService) { }

  ngOnInit(): void {
    this.loadAnimals();
  }

  loadAnimals(): void {
    this.animalService.getAnimals().subscribe((data: any[]) => {
      this.animals = data;
      this.filteredAnimals = data;
    });
  }

  filterAnimals(): void {
    this.filteredAnimals = this.animals.filter(animal => {
      return (!this.filters.statusAdoption || animal.statusAdoption === this.filters.statusAdoption) &&
             (!this.filters.species || animal.species === this.filters.species) &&
             (!this.filters.startDate || new Date(animal.birthDate) >= new Date(this.filters.startDate)) &&
             (!this.filters.endDate || new Date(animal.birthDate) <= new Date(this.filters.endDate));
    });
  }

  editAnimal(id: string): void {
    console.log('Editando animal com ID:', id);
  }

  deleteAnimal(id: string): void {
    if (id) {
      this.animalService.deleteAnimal(id).subscribe(() => {
        this.loadAnimals();
      });
    }
  }
}