import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-main-window',
  imports: [],
  templateUrl: './main-window.component.html',
  styleUrl: './main-window.component.css',

})
export class MainWindowComponent {

settlementData = input<{settlement: string}>();
}
