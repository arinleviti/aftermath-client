import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../injection-tokens/app.config';
import { HttpClient } from '@angular/common/http';
import { ApiResponseDto } from '../dtos/apiResponseDto';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = inject(API_BASE_URL);
  private http = inject(HttpClient)

  userExists(name: string) {
    return this.http.get<boolean>(`${this.apiUrl}/UserExists/${name}`)
  }

  retrieveModelData(userId: string) {
    return this.http.get<ApiResponseDto>(`${this.apiUrl}/Model/${userId}`)
  }
}
