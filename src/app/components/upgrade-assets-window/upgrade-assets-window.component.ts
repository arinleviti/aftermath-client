import { Component, inject, output } from '@angular/core';
import { BuildingDataService } from '../../_services/building-data.service';
import { SubmenuItem } from '../../interfaces/submenu-item';

@Component({
  selector: 'app-upgrade-assets-window',
  imports: [],
  templateUrl: './upgrade-assets-window.component.html',
  styleUrl: './upgrade-assets-window.component.css'
})
export class UpgradeAssetsWindowComponent {
 buildingDataService = inject(BuildingDataService);
 closeWindow = output<boolean>();
 submenuItem: SubmenuItem | null = null;
 upgrade() {

 }
 onCloseWindow() {
  this.closeWindow.emit(true);
}

}
