import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterLink } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Donation, DonationService } from '../../services/donation.service';
import { DonationInstitutionListComponent } from './donation-institution-list.component';

describe('DonationInstitutionListComponent', () => {
  let component: DonationInstitutionListComponent;
  let fixture: ComponentFixture<DonationInstitutionListComponent>;
  let donationService: jasmine.SpyObj<DonationService>;
  let authService: jasmine.SpyObj<AuthService>;

  const mockInstitution = {
    id: '456',
    name: 'Instituição PetPar',
    cnpj: '00.000.000/0001-00',
    email: 'contato@petpar.com'
  };

  const mockDonations: Donation[] = [
    {
      id: '1',
      amount: 100,
      paymentMethod: 'CARTAO',  // Agora com o campo paymentMethod
      donationDate: new Date(),
    }
  ];

  beforeEach(async () => {
    const donationServiceSpy = jasmine.createSpyObj('DonationService', 
      ['getInstitutionDonations', 'updateDonationStatus']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getCurrentInstitution']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterLink],
      declarations: [DonationInstitutionListComponent],
      providers: [
        { provide: DonationService, useValue: donationServiceSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    donationService = TestBed.inject(DonationService) as jasmine.SpyObj<DonationService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    
    fixture = TestBed.createComponent(DonationInstitutionListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load donations on init', () => {
    authService.getCurrentInstitution.and.returnValue(mockInstitution);
    donationService.getInstitutionDonations.and.returnValue(of(mockDonations));

    fixture.detectChanges();

    expect(donationService.getInstitutionDonations).toHaveBeenCalledWith('456');
    expect(component.donations).toEqual(mockDonations);
    expect(component.loading).toBeFalse();
  });

  it('should handle error when loading donations', () => {
    authService.getCurrentInstitution.and.returnValue(mockInstitution);
    donationService.getInstitutionDonations.and.returnValue(throwError(() => new Error('Erro')));

    fixture.detectChanges();

    expect(component.errorMessage).toBe('Erro ao carregar doações');
    expect(component.loading).toBeFalse();
  });

  it('should update donation status', () => {
    donationService.updateDonationStatus.and.returnValue(of(mockDonations[0]));
    authService.getCurrentInstitution.and.returnValue(mockInstitution);
    
    component.updateStatus('1', 'confirmado');
    
    expect(donationService.updateDonationStatus).toHaveBeenCalledWith('1', 'confirmado');
  });

  it('should handle error when updating status', () => {
    donationService.updateDonationStatus.and.returnValue(throwError(() => new Error('Erro')));
    authService.getCurrentInstitution.and.returnValue(mockInstitution);
    
    component.updateStatus('1', 'confirmado');
    
    expect(component.errorMessage).toBe('Erro ao atualizar status');
  });

  it('should show error if institution not authenticated', () => {
    authService.getCurrentInstitution.and.returnValue(null);
    
    component.loadDonations();
    
    expect(component.errorMessage).toBe('Instituição não autenticada');
  });
});
