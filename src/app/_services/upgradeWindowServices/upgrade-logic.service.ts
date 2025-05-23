import { inject, Injectable, Input, Signal, WritableSignal } from '@angular/core';
import { TownDto } from '../../dtos/townDto';
import { UpgradeDto } from '../../dtos/upgradeDto';
import { ApiResponseDto } from '../../dtos/apiResponseDto';
import { ItemType } from '../../shared/enums/itemType';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../../injection-tokens/app.config';


@Injectable({
  providedIn: 'root'
})
export class UpgradeLogicService {

  private http = inject(HttpClient);
  private apiUrl = inject(API_BASE_URL);
  serverSpeedInSec: number = 1;

   findCurrentResearchLvl(itemType: number | null, userId: number | null, modelResponse: Signal< ApiResponseDto | undefined>) : number {
      if (userId === null) {
        throw new Error('User ID cannot be null when finding current research');
      }
      switch (itemType) {
        case 31: return modelResponse()?.user.combustionLvl ?? 0;
        case 32: return modelResponse()?.user.electricityLvl ?? 0;
        case 33: return modelResponse()?.user.leaderShipLvl ?? 0;
        case 34: return modelResponse()?.user.machineryLvl ?? 0;
        case 35: return modelResponse()?.user.scoutingLvl ?? 0;
        case 36: return modelResponse()?.user.weaponsLvl ?? 0;
        case 37: return modelResponse()?.user.shieldLvl ?? 0;
        case 38: return modelResponse()?.user.structuralLvl ?? 0;
        case 39: return modelResponse()?.user.survivalLvl ?? 0;
        default: return 0;
      }
    }
  
    findCurrentAssetLevel(itemType: number | null , townDto: TownDto): number {
      switch (itemType) {
        case 0: return townDto.metalLvl;
        case 1: return townDto.metalStorageLvl
        case 2: return townDto.oilLvl;
        case 3: return townDto.oilStorageLvl;
        case 4: return townDto.waterLvl;
        case 5: return townDto.waterStorageLvl;
        case 6: return townDto.solarPlantLvl;
        default: return 0; 
      }
    }

    createUpgradeDto(townId: number, itemType: number | null): UpgradeDto {
        if (itemType === null) {
          throw new Error('Item type cannot be null when creating UpgradeDto');
        }
        return {
          townId: townId,
          itemType: itemType
        };
      }

      buttonSwitcher(currentTownId: number | null, itemType: number | null, isBuildingUpgradeButton: WritableSignal<boolean>, isResearchUpgradeButton:WritableSignal<boolean>) {
        if (itemType === null || currentTownId === null) {
          console.error('Invalid item type or town ID');
          return;
        }
        if (itemType >= 0 && itemType <= 10) {
          isBuildingUpgradeButton.set(true);
          isResearchUpgradeButton.set(false);
        }
        if( itemType >= 31 && itemType <= 39) {
          isBuildingUpgradeButton.set(false);
          isResearchUpgradeButton.set(true);
        }
    
      }

findCorrespondingImg(selectedCategoryFromSubmenu: Signal<string | null>): string | null {
        const selected = selectedCategoryFromSubmenu();
        if (selected ) {
          switch (selected) {
            case 'ScrapeYard': return 'BuildingsImgs/scrape-yard.png';
            case 'WaterPurifier': return 'BuildingsImgs/water-purifier.png';
            case 'OilRig': return 'BuildingsImgs/oil-rig.png';
            case 'Warehouse': return 'BuildingsImgs/warehouse.png';
            case 'WaterTank': return 'BuildingsImgs/water-tank.png';
            case 'OilTank': return 'BuildingsImgs/oil-tank.png';
            case 'SolarPlant': return 'BuildingsImgs/solar-plant.png';
            case 'Workshop': return 'BuildingsImgs/workshop.png';
            case 'Garage': return 'BuildingsImgs/garage.png';
            case 'Laboratory': return 'BuildingsImgs/laboratory.png';
            case 'Electricity': return 'ResearchImgs/electricity.png';
            case 'Machinery': return 'ResearchImgs/machinery.png';
            case 'Combustion': return 'ResearchImgs/combustion.png';
            case 'Scouting': return 'ResearchImgs/scouting.png';
            case 'Survival': return 'ResearchImgs/survival.png';
            case 'Leadership': return 'ResearchImgs/leadership.png';
            case 'Shield': return 'ResearchImgs/shield.png';
            case 'Weapons': return 'ResearchImgs/weapons.png';
            case 'Structural': return 'ResearchImgs/structural.png';
            case 'Armored Car': return 'ResearchImgs/armoredcar.png';
            default: console.error('Invalid selected category:', selected); return null;
        }
        } else {
          console.error('Invalid selected category:', selected);
          return null;
        }
      }


      // Get the corresponding number for the selected category
        findCorrespondingNumber(selectedCategoryFromSubmenu : Signal<string | null>): number | null {
      
          const selected = selectedCategoryFromSubmenu();
          if (selected && selected in ItemType) {
            const correspNumber = ItemType[selected as keyof typeof ItemType];
            console.log('Corresponding number for selected category:', correspNumber);
            console.log('Selected category:', selected);
            return correspNumber;
          } else {
            console.error('Invalid selected category:', selected);
            return null;
          }
        }

        calculateSolarEnergyProduced(town : TownDto): number {
          return (20 * town.solarPlantLvl * Math.pow(1.1, town.solarPlantLvl));
        }

        calculateWindEnergyProduced(town : TownDto): number {
          return (town.windmills ) * town.windSpeed;

        }

        calculateEnergyProduced(town : TownDto): number {
          return this.calculateSolarEnergyProduced(town) + this.calculateWindEnergyProduced(town);
        }

        calculateResearchTime(town : TownDto, metalCost: number, waterCost: number): number {
          var timeInHours = (metalCost + waterCost) / (1000 + (1 + town.laboratoryLvl))
          var timeinSec = Math.floor((3600 * timeInHours) / this.serverSpeedInSec);
          return timeinSec;
        }
        loadServerSpeed(): Promise<number> {
          return new Promise((resolve, reject) => {
            this.http.get<number>(`${this.apiUrl}/GetServerSpeed`).subscribe({
              next: (response) => {
                this.serverSpeedInSec = response;
                resolve(response);
              },
              error: (err) => {
                console.error('Failed to fetch server speed', err);
                reject(err);
              }
            });
          });
        }
        }
         

