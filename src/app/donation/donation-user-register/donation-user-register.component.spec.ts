import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { DonationService } from '../../services/donation.service';
import { DonationUserRegisterComponent } from './donation-user-register.component';

describe('DonationUserRegisterComponent', () => {
  let component: DonationUserRegisterComponent;
  let fixture: ComponentFixture<DonationUserRegisterComponent>;
  let donationService: jasmine.SpyObj<DonationService>;

  beforeEach(async () => {
    const donationServiceSpy = jasmine.createSpyObj('DonationService', ['createDonation']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [DonationUserRegisterComponent],
      providers: [
        { provide: DonationService, useValue: donationServiceSpy }
      ]
    }).compileComponents();

    donationService = TestBed.inject(DonationService) as jasmine.SpyObj<DonationService>;
    fixture = TestBed.createComponent(DonationUserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit valid form', () => {
    donationService.createDonation.and.returnValue(of({} as any));
    component.donationForm.patchValue({
      amount: 100,
      donationType: 'dinheiro',
      institutionId: '123'
    });
    
    component.onSubmit();
    expect(donationService.createDonation).toHaveBeenCalled();
  });
});