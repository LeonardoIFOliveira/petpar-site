import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Donation, DonationService } from '../../services/donation.service';

@Component({
  selector: 'app-donation-institution-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './donation-institution-list.component.html',
  styleUrls: ['./donation-institution-list.component.css']
})
export class DonationInstitutionListComponent implements OnInit {
  donations: Donation[] = [];
  loading = false;
  errorMessage: string | null = null;
  institutionList: any[] = [];

  constructor(
    private donationService: DonationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadDonations();
  }

  loadDonations(): void {
    this.loading = true;
    this.errorMessage = null;

    const institutionId = this.authService.getCurrentInstitution()?.id;
    
    if (!institutionId) {
      this.errorMessage = 'Instituição não autenticada';
      this.loading = false;
      return;
    }

    this.donationService.getInstitutionDonations(institutionId).subscribe({
      next: (data) => {
        this.donations = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar doações';
        this.loading = false;
        console.error(err);
      }
    });
  }

  updateStatus(donationId: string, status: 'confirmado' | 'recusado'): void {
    this.loading = true;
    this.errorMessage = null;

    this.donationService.updateDonationStatus(donationId, status).subscribe({
      next: () => {
        this.loadDonations(); // Recarrega a lista após a atualização
      },
      error: (err) => {
        this.errorMessage = 'Erro ao atualizar status';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
