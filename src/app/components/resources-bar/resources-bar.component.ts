import { Component, computed, inject, input, OnInit } from '@angular/core';
import { TownDto } from '../../dtos/townDto';
import { UpgradeLogicService } from '../../_services/upgradeWindowServices/upgrade-logic.service';

@Component({
  selector: 'app-resources-bar',
  imports: [],
  templateUrl: './resources-bar.component.html',
  styleUrl: './resources-bar.component.css',
  inputs: []  // ✅ New Angular 17+ syntax
})
export class ResourcesBarComponent {
  resources = input<{ metal: number; water: number; oil: number;  uranium: number ; currentTown: TownDto | null }>(); // Adjust type as needed

  upgradeLogicService = inject(UpgradeLogicService);
 

  energy = computed (() => {
    const currentTown = this.resources()?.currentTown
  return currentTown ? this.upgradeLogicService.calculateEnergyProduced(currentTown) : 0;
  });

}
