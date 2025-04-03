import { Component, inject, input, output } from '@angular/core';


@Component({
  selector: 'app-submenu',
  imports: [],
  templateUrl: './submenu.component.html',
  styleUrl: './submenu.component.css'
})
export class SubmenuComponent {

  submenuItems = input<string[]>();
  title = input<string | null>();

  selectedSubmenuItem: string | null = null;
  submenuItemClicked = output<boolean>();

  onItemClicked() {
    this.submenuItemClicked.emit(true);
  } 
  closeWindow() {
    this.selectedSubmenuItem = null;
  }
  toggleSubmenuWindow() {
}
}
