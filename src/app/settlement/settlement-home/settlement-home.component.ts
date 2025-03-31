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


@Component({
  selector: 'app-settlement-home',
  standalone: true,
  imports: [CommonModule, ResourcesBarComponent, DashboardComponent, MainWindowComponent, SubmenuComponent],
  templateUrl: './settlement-home.component.html',
  styleUrl: './settlement-home.component.css'
})
export class SettlementHomeComponent implements OnInit {
  private accountService = inject(AccountService);
  name = 'arin';
  userId = '55';
  responseFromAPI?: boolean;
  modelResponse = signal< ApiResponseDto | undefined>(undefined); 
  userFromModelResponse?: UserDto;

  selectedCategory: string | null = null;
  submenuItems: string[] = [];

  resourcesForBar = computed(() => {
    const model = this.modelResponse();
    return {
      metal: model?.selectedTown?.metal ?? 0,
      oil: model?.selectedTown?.oil ?? 0,
      water: model?.selectedTown?.water ?? 0,
      energy: 0,
      uranium: model?.selectedTown?.uranium ?? 0
    };
  });
  
  currentSettlement = computed(() =>{
  const model = this.modelResponse();
  return {
    settlement: model?.selectedTown?.name ?? 'no town found'
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


}
