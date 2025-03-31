import { Component, inject, output } from '@angular/core';
import { MenuService } from '../../_services/menu.service';
import { SubmenuComponent } from "../submenu/submenu.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  /* selectedCategory: string | null = null;
  submenuItems: string[] = []; */

  selectedCategory = output<string>();
  submenuItems = output<string[]>();
  menuService = inject(MenuService);

  openSubmenu(category: string) {
    this.selectedCategory.emit(category);
    this.submenuItems.emit(this.menuService.getSubmenu(category));
   }
}
