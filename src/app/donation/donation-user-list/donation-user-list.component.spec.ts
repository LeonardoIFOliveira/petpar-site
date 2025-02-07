import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { DonationService } from '../../services/donation.service';
import { DonationUserListComponent } from './donation-user-list.component';

type PaymentMethod = 'CARTAO' | 'PIX';
interface Donation {
  id: string;
  amount: number;
  paymentMethod: PaymentMethod;
  donationDate: Date;
}


describe('DonationUserListComponent', () => {
  let component: DonationUserListComponent;
  let fixture: ComponentFixture<DonationUserListComponent>;
  let donationService: jasmine.SpyObj<DonationService>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const donationServiceSpy = jasmine.createSpyObj('DonationService', ['getUserDonations']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getCurrentUser']);

    await TestBed.configureTestingModule({
      declarations: [DonationUserListComponent],
      providers: [
        { provide: DonationService, useValue: donationServiceSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    donationService = TestBed.inject(DonationService) as jasmine.SpyObj<DonationService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture = TestBed.createComponent(DonationUserListComponent);
    component = fixture.componentInstance;
  });

  it('should load donations successfully', () => {
    // Agora, estamos simulando o retorno diretamente no serviço de doação
    donationService.getUserDonations.and.returnValue(of([
      {
        id: '1',
        amount: 100,
        paymentMethod: 'CARTAO', // Alterado para 'CARTAO'
        donationDate: new Date('2025-01-01')
      },
      {
        id: '2',
        amount: 50,
        paymentMethod: 'PIX', // Alterado para 'PIX'
        donationDate: new Date('2025-01-02')
      }
    ]));

    fixture.detectChanges();

    // Verificando o comportamento esperado
    expect(component.donations.length).toBe(2);
    expect(component.donations[0].amount).toBe(100);
  });
});
