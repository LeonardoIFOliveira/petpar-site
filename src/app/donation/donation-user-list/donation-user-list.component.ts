import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Donation, DonationService } from '../../services/donation.service';

@Component({
  selector: 'app-donation-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './donation-user-list.component.html',
  styleUrls: ['./donation-user-list.component.css'],
})
export class DonationUserListComponent implements OnInit {
  donations: Donation[] = [];
  loading = false;
  errorMessage: string | null = null;
  institutionList: any[] = [];

  constructor(
    private donationService: DonationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadInstitutions();
  }

  loadInstitutions(): void {
    this.donationService.getInstitutionDonations('institutionId').subscribe({
      next: (data) => {
        this.institutionList = data;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar instituições';
        console.error(err);
      }
    });
  }

  loadDonations(): void {
    this.loading = true;
    const userId = this.authService.getCurrentUser()?.id;
    
    if (!userId) {
      this.errorMessage = 'Usuário não autenticado';
      return;
    }

    this.donationService.getUserDonations(userId).subscribe({
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
}
