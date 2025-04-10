import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../injection-tokens/app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponseDto } from '../dtos/apiResponseDto';
import { UpgradeDto } from '../dtos/upgradeDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  userName = 'draco';
  userId = '55';

  private apiUrl = inject(API_BASE_URL);
  private http = inject(HttpClient)

  userExists(name: string) {
    return this.http.get<boolean>(`${this.apiUrl}/UserExists/${name}`)
  }

  retrieveModelData(userId: string) {
    return this.http.get<ApiResponseDto>(`${this.apiUrl}/Model/${userId}`)
  }

  upgradeAssets(upgradeDtoObj: UpgradeDto) {
    return this.http.post<UpgradeDto>(`${this.apiUrl}/Upgrade`, upgradeDtoObj, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json' // Type assertion to satisfy Angular's type definitions
    }
  ) as unknown as Observable<string>; // Final type assertion
;
  }
}
