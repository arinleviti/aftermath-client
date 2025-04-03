import { Injectable } from '@angular/core';
import { SubmenuItem } from '../interfaces/submenu-item';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuData: Record<string, string[]> = {
    'Buildings': ['Scrapeyard', 'Water Purifier', 'Oil Rig', 'Wharehouse', 'Water Tank', 'Oil Tank', 'Solar Plant', 'Workshop', 'Garage', 'Laboratory'],
    'Research': ['Electricity', 'Machinery', 'Combustion', 'Scouting', 'Survival', 'Leadership', 'Shield', 'Weapons', 'Structural'],
    'Units': ['Bike Rider', 'Quad Rider', 'Spitfire', 'Armored Car', 'Armor', 'Katyusha'],
    'Civil Units': ['Scout', 'Minivan', 'Truck', 'Garbage Truck', 'Armored Bus', 'Windmill'],
    'Defense': ['Rifle Man', 'Flame Thrower', 'Rocket Launcher', 'Mortar', 'Machine Gun'],
    'Deployment': [],
    'Exploration': []
  }
  getSubmenu(mainButton: string): string[] {
    return this.menuData[mainButton] || [];
  }

  
}

