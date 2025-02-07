import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AnimalService } from '../../services/animal.service';
import { InstitutionAnimalListComponent } from './institution-animal-list.component';

describe('InstitutionAnimalListComponent', () => {
  let component: InstitutionAnimalListComponent;
  let fixture: ComponentFixture<InstitutionAnimalListComponent>;
  let animalService: jasmine.SpyObj<AnimalService>;

  beforeEach(async () => {
    const animalServiceSpy = jasmine.createSpyObj('AnimalService', ['getAnimal', 'getAnimals', 'deleteAnimal']);

    await TestBed.configureTestingModule({
      declarations: [InstitutionAnimalListComponent],
      imports: [FormsModule],
      providers: [
        { provide: AnimalService, useValue: animalServiceSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InstitutionAnimalListComponent);
    component = fixture.componentInstance;
    animalService = TestBed.inject(AnimalService) as jasmine.SpyObj<AnimalService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load animals on init', () => {
    const mockAnimals = [
      { id: '1', species: 'Cachorro', name: 'Rex', gender: 'M', birthDate: '2020-01-01', adopter: 'João', institution: 'PetPar' }
    ];

    // Caso tenha o método getAnimals, use-o
    animalService.getAnimals.and.returnValue(of(mockAnimals));  // Caso você tenha implementado o método getAnimals
    // Se não, use getAnimal e altere a lógica para obter um animal com um id específico.
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.animals).toEqual(mockAnimals);
    expect(component.filteredAnimals).toEqual(mockAnimals);
  });

  it('should delete an animal', () => {
    const mockAnimals = [
      { id: '1', species: 'Cachorro', name: 'Rex', gender: 'M', birthDate: '2020-01-01', adopter: 'João', institution: 'PetPar' }
    ];
    animalService.getAnimals.and.returnValue(of(mockAnimals));
    animalService.deleteAnimal.and.returnValue(of({}));

    component.ngOnInit();
    component.deleteAnimal('1');  // Passando o id como string
    fixture.detectChanges();

    expect(animalService.deleteAnimal).toHaveBeenCalledWith('1'); // Passando o id como string
  });
});
