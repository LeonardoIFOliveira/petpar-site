import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DonationService } from '../../services/donation.service';

@Component({
  selector: 'app-donation-user-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './donation-user-register.component.html',
  styleUrls: ['./donation-user-register.component.css']
})
export class DonationUserRegisterComponent {
  donationForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  showCreditCard = true;

  constructor(
    private fb: FormBuilder,
    private donationService: DonationService,
    private router: Router
  ) {
    this.donationForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0.01)]],
      paymentMethod: ['CARTAO', Validators.required],
      cardName: [''],
      cardNumber: [''],
      cardExpiry: [''],
      cardCVV: ['']
    });

    this.setupPaymentValidation();
  }

  private setupPaymentValidation() {
    const creditCardFields = ['cardName', 'cardNumber', 'cardExpiry', 'cardCVV'];
    
    this.donationForm.get('paymentMethod')?.valueChanges.subscribe(method => {
      this.showCreditCard = method === 'CARTAO';
      
      creditCardFields.forEach(field => {
        const control = this.donationForm.get(field);
        if (method === 'CARTAO') {
          control?.setValidators([Validators.required]);
        } else {
          control?.clearValidators();
        }
        control?.updateValueAndValidity();
      });
    });
  }

  onSubmit(): void {
    if (this.donationForm.invalid) return;

    this.loading = true;
    this.errorMessage = null;

    const donationData = {
      ...this.donationForm.value,
      donationDate: new Date()
    };

    if (donationData.paymentMethod === 'PIX') {
      delete donationData.cardName;
      delete donationData.cardNumber;
      delete donationData.cardExpiry;
      delete donationData.cardCVV;
    }

    this.donationService.createDonation(donationData).subscribe({
      next: () => {
        this.router.navigate(['/doacoes/confirmacao']);
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao registrar doação';
        this.loading = false;
        console.error(err);
      }
    });
  }
}