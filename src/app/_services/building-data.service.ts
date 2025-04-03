import { inject, Injectable } from '@angular/core';
import { BuildingCost } from '../dtos/buildingCostDto';
import { API_BASE_URL } from '../injection-tokens/app.config';
import { CurrentAssetsDto } from '../dtos/currentAssetsDto'; // Adjusted the path to match the correct file name
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BuildingDataService {

  private apiUrl = inject(API_BASE_URL);
  private http = inject(HttpClient);
  buildingCost?: BuildingCost;

  createBuilding(id: number, name: string, description: string, type: string,
    level: number, productionDuration?: number) {
    return {
      id,
      name,
      description,
      type,
      cost: this.getBuildingCost(level + 1),
      productionDuration,
      level
    };
  }
 
  getBuildingCost(levelToUpgrade: number): BuildingCost {
    return this.buildingCost = {
      metal: levelToUpgrade * 0,
      water: levelToUpgrade * 0,
      oil: levelToUpgrade * 0
    }
  }

  getcurrentAssetsData(userId: string) {
    return this.http.get<CurrentAssetsDto>(`${this.apiUrl}/Model/${userId}`)
  }

}


