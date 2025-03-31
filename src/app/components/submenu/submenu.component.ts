import { Component, inject, input } from '@angular/core';


@Component({
  selector: 'app-submenu',
  imports: [],
  templateUrl: './submenu.component.html',
  styleUrl: './submenu.component.css'
})
export class SubmenuComponent {

  submenuItems= input<string[]>();
 title = input<string | null>();

 selectedSubmenuItem: string | null = null;

 openSubmenuItem(item: string) {
  this.selectedSubmenuItem = item;
 }

 closeWindow() {
  this.selectedSubmenuItem = null;
 }
}
