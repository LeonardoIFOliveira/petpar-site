import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Institution } from '../core/model';
import { Animal } from '../core/model';
import { Observable } from 'rxjs';

export type PaymentMethod = 'CARTAO' | 'PIX';

export interface Donation {
  id: string;
  amount: number;
  paymentMethod: PaymentMethod;
  cardDetails?: {
    cardName: string;
    cardNumber: string;
    cardExpiry: string;
    cardCVV: string;
  };
  donationDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private donationUrl = 'http://localhost:8080.com/v1/donations';

  constructor(private http: HttpClient) { }

  createDonation(donation: Partial<Donation>): Observable<Donation> {
    return this.http.post<Donation>(this.apiUrl, donation);
  }

  getUserDonations(userId: string): Observable<Donation[]> {
    return this.http.get<Donation[]>(`${this.donationUrl}/user/${userId}`);
  }

  getInstitutionDonations(institutionId: string): Observable<Donation[]> {
    return this.http.get<Donation[]>(`${this.donationUrl}/institution/${institutionId}`);
  }

  updateDonationStatus(id: string, status: 'confirmado' | 'recusado'): Observable<Donation> {
    return this.http.patch<Donation>(`${this.donationUrl}/${id}/status`, { status });
  }
}
