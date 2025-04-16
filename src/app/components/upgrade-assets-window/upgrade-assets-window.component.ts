import { Component, effect, inject, input, OnInit, output, signal, untracked } from '@angular/core';
import { BuildingDataService } from '../../_services/building-data.service';
import { SubmenuData } from '../../interfaces/submenuData';
import { ItemType } from '../../shared/enums/itemType';
import { AccountService } from '../../_services/account.service';
import { map, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UpgradeDto } from '../../dtos/upgradeDto';
import { TownDto } from '../../dtos/townDto';
import { ApiResponseDto } from '../../dtos/apiResponseDto';

@Component({
  selector: 'app-upgrade-assets-window',
  imports: [],
  templateUrl: './upgrade-assets-window.component.html',
  styleUrl: './upgrade-assets-window.component.css'
})
export class UpgradeAssetsWindowComponent implements OnInit {
  buildingDataService = inject(BuildingDataService);
  closeWindow = output<boolean>();
  submenuItem: SubmenuData | null = null;
  accountService = inject(AccountService);
  currentTownId: number | null = null;
  selectedCategoryFromSubmenu = input<string | null>();
  currentAssetLevel: number | null = null;
  currentResearchLvl= signal<number | null>(null);
  itemType: number | null  =null;
  upgradeDtoObj: UpgradeDto | null = null;
  isBuildingUpgradeButton: boolean = false;
  isResearchUpgradeButton: boolean = false;

  modelResponse = signal< ApiResponseDto | undefined>(undefined); 

  ngOnInit(): void {
    this.initializeWindow(); // force it on component init
    this.retrieveModelData(this.accountService.userId);
  }

  private updateSubmenuItemsEffect = effect(() => {
    const selectedCategory = this.selectedCategoryFromSubmenu();
    
    if (selectedCategory) {
      untracked(() => {
        this.initializeWindow();
      });
    }
  }); 

  initializeWindow() {
    this.itemType = this.findCorrespondingNumber();
  this.findTownId().subscribe({
    next: (townId) => {
      this.currentTownId = townId;
      console.log('Current town ID:', this.currentTownId);
    },
    error: (err) => {
      console.error('Error retrieving town ID:', err);
    }
  });
  
  }

/* ngOnInit(): void {
  this.itemType = this.findCorrespondingNumber();
  this.findTownId().subscribe({
    next: (townId) => {
      this.currentTownId = townId;
      console.log('Current town ID:', this.currentTownId);
    },
    error: (err) => {
      console.error('Error retrieving town ID:', err);
    }
  });
  
} */
// Get the corresponding number for the selected category
  findCorrespondingNumber(): number | null {

    const selected = this.selectedCategoryFromSubmenu();
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
// Retrieve the town ID from the account service
  findTownId(): Observable<number> {
    return this.accountService.retrieveModelData(this.accountService.userId).pipe(
      map((response) => {
        const town = response.selectedTown;
        if (town)
        this.currentAssetLevel = this.findCurrentAssetLevel(this.itemType, town);
        
        console.log('Town found:', town);
        if (town) {
          console.log('Town found:', town);
          this.buttonSwitcher(town.id);
          if(this.isResearchUpgradeButton === true) {
            this.retrieveModelData(this.accountService.userId);
            this.currentResearchLvl.set(this.findcurrentResearchLvl(this.itemType, this.accountService.userId));
            console.log('Current research level:', this.currentResearchLvl);
          }
          return town.id;         
        } else {
          throw new Error('Town not found in the response');
        }
      })
    );
  }

  buttonSwitcher(currentTownId: number | null) {
    if (this.itemType === null || currentTownId === null) {
      console.error('Invalid item type or town ID');
      return;
    }
    if (this.itemType >= 0 && this.itemType <= 10) {
      this.isBuildingUpgradeButton = true;
      this.isResearchUpgradeButton = false;
    }
    if( this.itemType >= 31 && this.itemType <= 39) {
      this.isBuildingUpgradeButton = false;
      this.isResearchUpgradeButton = true;
    }

  }

  upgradeBService = this.accountService.upgradeBuildings(this.upgradeDtoObj);
  // Handle the upgrade process
  upgradeBuilding() {
    if (this.itemType === null || this.currentTownId === null) {
      console.error('Invalid item type or town ID');
      return;
    }

    this.upgradeDtoObj = this.createUpgradeDto(this.currentTownId, this.itemType);
    this.accountService.upgradeBuildings(this.upgradeDtoObj).subscribe({
      next: (result) => {
        console.log('Upgrade successful:', result);
      },
      error: (err) => {
        console.error('Error during upgrade:', err);
      }
    });
  }

  upgradeResearch(){
    if (this.itemType === null || this.currentTownId === null) {
      console.error('Invalid item type or town ID');
      return;
    }
    this.upgradeDtoObj = this.createUpgradeDto(this.currentTownId, this.itemType);
    this.accountService.research(this.upgradeDtoObj).subscribe({
      next: (result) => {
        this.retrieveModelData(this.accountService.userId);
        console.log('Research successful:', result);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error during research:', err);
      }
    });

  }

  onCloseWindow() {
    this.closeWindow.emit(true);
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

  retrieveModelData(userId: number) {
    this.accountService.retrieveModelData(userId).subscribe({
      next: response => {
        this.modelResponse.set(response);
      },
      error: err => {
        console.error('Error occured while retrieving the model', err);
      }
    })
  }

  findcurrentResearchLvl(itemType: number | null, userId: number | null) : number {
    if (userId === null) {
      throw new Error('User ID cannot be null when finding current research');
    }
    switch (itemType) {
      case 31: return this.modelResponse()?.user.combustionLvl ?? 0;
      case 32: return this.modelResponse()?.user.electricityLvl ?? 0;
      case 33: return this.modelResponse()?.user.leaderShipLvl ?? 0;
      case 34: return this.modelResponse()?.user.machineryLvl ?? 0;
      case 35: return this.modelResponse()?.user.scoutingLvl ?? 0;
      case 36: return this.modelResponse()?.user.weaponsLvl ?? 0;
      case 37: return this.modelResponse()?.user.shieldLvl ?? 0;
      case 38: return this.modelResponse()?.user.structuralLvl ?? 0;
      case 39: return this.modelResponse()?.user.survivalLvl ?? 0;
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
}
