import { Injectable } from '@angular/core';
import { SubmenuData } from '../interfaces/submenuData';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuData: Record<string, string[]> = {
    'Buildings': ['ScrapeYard', 'WaterPurifier', 'OilRig', 'Wharehouse', 'WaterTank', 'OilTank', 'SolarPlant', 'Workshop', 'Garage', 'Laboratory'],
    'Research': ['Electricity', 'Machinery', 'Combustion', 'Scouting', 'Survival', 'Leadership', 'Shield', 'Weapons', 'Structural'],
    'Units': ['Bike Rider', 'Quad Rider', 'Spitfire', 'Armored Car', 'Armor', 'Katyusha'],
    'Civil Units': ['Scout', 'Minivan', 'Truck', 'GarbageTruck', 'ArmoredBus', 'Windmill'],
    'Defense': ['RifleMan', 'FlameThrower', 'RocketLauncher', 'Mortar', 'MachineGun'],
    'Deployment': [],
    'Exploration': []
  }
  getSubmenu(mainButton: string): string[] {
    return this.menuData[mainButton] || [];
  }

  
}

