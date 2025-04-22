import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { ApiResponseDto } from '../../dtos/apiResponseDto';
import { map } from 'rxjs';
import { UserDto } from '../../dtos/userDto';
import { CommonModule } from '@angular/common';
import { ResourcesBarComponent } from "../../components/resources-bar/resources-bar.component";
import {  MainWindowComponent } from "../../components/main-window/main-window.component";
import { DashboardComponent } from "../../components/dashboard/dashboard.component";
import { SubmenuComponent } from '../../components/submenu/submenu.component';
import { UpgradeAssetsWindowComponent } from "../../components/upgrade-assets-window/upgrade-assets-window.component";


@Component({
  selector: 'app-settlement-home',
  standalone: true,
  imports: [CommonModule, ResourcesBarComponent, DashboardComponent, MainWindowComponent, SubmenuComponent, UpgradeAssetsWindowComponent],
  templateUrl: './settlement-home.component.html',
  styleUrl: './settlement-home.component.css'
})
export class SettlementHomeComponent implements OnInit {
  private accountService = inject(AccountService);
  name = this.accountService.userName;
  userId = this.accountService.userId;
  responseFromAPI?: boolean;
  modelResponse = signal< ApiResponseDto | undefined>(undefined); 
  userFromModelResponse?: UserDto;
  submenuItemClicked: boolean = false;
  selectedCategory: string | null = null;
  submenuItems: string[] = [];
  selectedItemFromSubmenu: string | null = null;

  resourcesForBar = computed(() => {
    const model = this.modelResponse();
    return {
      metal: Math.floor(model?.selectedTown?.metal ?? 0),
      oil: Math.floor(model?.selectedTown?.oil ?? 0),
      water: Math.floor(model?.selectedTown?.water ?? 0),
      uranium: Math.floor(model?.selectedTown?.uranium ?? 0),
      currentTown: model?.selectedTown ?? null
    };
  });
  
  currentSettlement = computed(() =>{
  const model = this.modelResponse();
  return {
    settlement: model?.selectedTown?.name ?? 'no town found',
    windSpeed: model?.selectedTown?.windSpeed ?? 0,
    maxSize: model?.selectedTown?.size ?? 0,
    continent: model?.selectedTown?.position?.continent ?? 'coordinates not found',
    region: model?.selectedTown?.position?.region ?? 'coordinates not found',
    area: model?.selectedTown?.position?.area ?? 'coordinates not found'
  };
  }
)

ngOnInit(): void {
  this.userExists()
  this.retrieveModelData();
  this.retrieveUserData();
}

  userExists() {
    this.accountService.userExists(this.name).subscribe( {
      next: response => { 
        this.responseFromAPI = response;

      },
      error: err => {
        console.error('Error occured while checking user existance', err);
      }
    });
  }

  retrieveModelData(){
    this.accountService.retrieveModelData(this.userId).subscribe({
      next: response => {
        this.modelResponse.set(response);
        console.log(response);
      },
      error: err => {
        console.error('Error occured while retrieving the model', err);
      }
    })
  }

  retrieveUserData() {
    this.accountService.retrieveModelData(this.userId).pipe(
      map(response=> response.user)
    ).subscribe({
      next : user => {
        this.userFromModelResponse = user;
        console.log(user);
      },
      error: err => {
        console.error('Error occured while retrieving the User data', err);
      }
    })
  }
  onSubmenuItemClicked(clicked: boolean) {
    console.log('Submenu clicked:', clicked); 
    this.submenuItemClicked = clicked; // Update the flag to show/hide the window
  }
  onUpgradeWindowClosed() {
    this.submenuItemClicked = false;  // This will hide the window
  }
}
