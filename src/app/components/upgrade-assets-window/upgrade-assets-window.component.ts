import { Component, effect, inject, input, OnInit, output, signal, untracked, WritableSignal } from '@angular/core';
import { BuildingDataService } from '../../_services/building-data.service';
import { SubmenuData } from '../../interfaces/submenuData';
import { ItemType } from '../../shared/enums/itemType';
import { AccountService } from '../../_services/account.service';
import { map, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UpgradeDto } from '../../dtos/upgradeDto';
import { TownDto } from '../../dtos/townDto';
import { ApiResponseDto } from '../../dtos/apiResponseDto';
import { CalculateResearchCost, CalculateUpgradeCost} from '../../utilities/calculateUpgradeCost';
import { CostDto } from '../../dtos/costDto';
import { UpgradeLogicService } from '../../_services/upgradeWindowServices/upgrade-logic.service';

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
  selectedCategoryFromSubmenu = input<string | null>(null);
  currentAssetLevel: number | null = null;
  currentResearchLvl= signal<number | null>(null);
  itemType: number | null  =null;
  upgradeDtoObj: UpgradeDto | null = null;
  isBuildingUpgradeButton: WritableSignal<boolean> = signal<boolean>(false);
  isResearchUpgradeButton: WritableSignal<boolean> = signal<boolean>(false);
  

  cost = signal<CostDto>({ metal: 0, water: 0, oil: 0 });

  modelResponse = signal< ApiResponseDto | undefined>(undefined); 


  private upgradeLogicService = inject(UpgradeLogicService);

  timeLeft = signal<number>(0); // current remaining time in seconds
  countdownInterval: any; // reference to the interval for cleanup

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
    this.itemType = this.upgradeLogicService.findCorrespondingNumber(this.selectedCategoryFromSubmenu);
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


// Retrieve the town ID from the account service
  findTownId(): Observable<number> {
    return this.accountService.retrieveModelData(this.accountService.userId).pipe(
      map((response) => {
        const town = response.selectedTown;
        if (town)
        this.currentAssetLevel = this.upgradeLogicService.findCurrentAssetLevel(this.itemType, town);
        
        
        console.log('Town found:', town);
        console.log('Current asset level:', this.currentAssetLevel);
        console.log('Upgrade cost:', this.cost());
        
        if (town) {
          console.log('Town found:', town);
          this.upgradeLogicService.buttonSwitcher(town.id, this.itemType, this.isBuildingUpgradeButton, this.isResearchUpgradeButton);
          if(this.isResearchUpgradeButton() === true) {
            this.retrieveModelData(this.accountService.userId);
            this.currentResearchLvl.set(this.upgradeLogicService.findCurrentResearchLvl(this.itemType, this.accountService.userId, this.modelResponse));
            console.log('Current research level:', this.currentResearchLvl);
            this.cost.set(CalculateResearchCost(this.itemType, this.currentResearchLvl()));
          } else {
            this.cost.set(CalculateUpgradeCost(this.itemType, this.currentAssetLevel));
          }
          return town.id;         
        } else {
          throw new Error('Town not found in the response');
        }
      })
    );
  }



  /* upgradeBService = this.accountService.upgradeBuildings(this.upgradeDtoObj); */
  // Handle the upgrade process
  upgradeBuilding() {
    if (this.itemType === null || this.currentTownId === null) {
      console.error('Invalid item type or town ID');
      return;
    }

    this.upgradeDtoObj = this.upgradeLogicService.createUpgradeDto(this.currentTownId, this.itemType);
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
    this.upgradeDtoObj = this.upgradeLogicService.createUpgradeDto(this.currentTownId, this.itemType);
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

  

  retrieveModelData(userId: number) {
    this.accountService.retrieveModelData(userId).subscribe({
      next: response => {
        this.modelResponse.set(response);
        this.calcResearchTime();
      },
      error: err => {
        console.error('Error occured while retrieving the model', err);
      }
    })
  }

  async calcResearchTime() {
    const town = this.modelResponse()?.selectedTown;
    if (!town) return;
    
    try {
      await this.upgradeLogicService.loadServerSpeed(); // Wait until server speed is loaded
      this.timeLeft.set(
        this.upgradeLogicService.calculateResearchTime(town, this.cost().metal, this.cost().water)
      );
      return this.timeLeft;
    } catch (error) {
      console.error('Failed to calculate research time due to server speed fetch error.', error);
    }
  }

  startResearchCountdown(){
    const town = this.modelResponse()?.selectedTown;
    if (!town) return;
  
    // Calculate research time in seconds
    this.timeLeft.set(this.upgradeLogicService.calculateResearchTime(town, this.cost().metal, this.cost().water)) ;
  
    // Clear any previous interval (good practice)
  if (this.countdownInterval) {
    clearInterval(this.countdownInterval);
  }
    // Now start the countdown
    this.countdownInterval = setInterval(() => {
      if (this.timeLeft() <= 1) {
        clearInterval(this.countdownInterval);
        this.timeLeft.set(0);
      } else {
        this.timeLeft.update(current => current - 1);
      }
    }, 1000);
  }

  get formattedTime(): string {
    const time = this.timeLeft(); // read signal value
    if (time <= 0) {
      return '00:00';
    }
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }
//ensures that the time value (whether it's minutes or seconds)
//  is always formatted as a two-digit number, even if it's less than 10.
  private padZero(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }

  
}
