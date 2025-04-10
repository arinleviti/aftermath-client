import { Component, inject, input, OnInit, output } from '@angular/core';
import { BuildingDataService } from '../../_services/building-data.service';
import { SubmenuData } from '../../interfaces/submenuData';
import { ItemType } from '../../shared/enums/itemType';
import { AccountService } from '../../_services/account.service';
import { map, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UpgradeDto } from '../../dtos/upgradeDto';
import { TownDto } from '../../dtos/townDto';

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
  itemType: number | null  =null;

ngOnInit(): void {
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
          return town.id;
        } else {
          throw new Error('Town not found in the response');
        }
      })
    );
  }

  // Handle the upgrade process
  upgrade() {
    if (this.itemType === null || this.currentTownId === null) {
      console.error('Invalid item type or town ID');
      return;
    }

    const upgradeDtoObj = this.createUpgradeDto(this.currentTownId, this.itemType);
    this.accountService.upgradeAssets(upgradeDtoObj).subscribe({
      next: (result) => {
        console.log('Upgrade successful:', result);
      },
      error: (err) => {
        console.error('Error during upgrade:', err);
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

  findCurrentAssetLevel(itemType: number | null , townDto: TownDto): number {
    switch (itemType) {
      case 0: return townDto.metalLvl;
      case 2: return townDto.oilLvl;
      case 4: return townDto.waterLvl;
      case 6: return townDto.solarPlantLvl;
      default: return 0; // or handle other cases as needed
    }
  }
}
