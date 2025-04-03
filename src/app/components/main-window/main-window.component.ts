import { Component, input, Input } from '@angular/core';
import { TownDto } from '../../dtos/townDto';

@Component({
  selector: 'app-main-window',
  imports: [],
  templateUrl: './main-window.component.html',
  styleUrl: './main-window.component.css',

})
export class MainWindowComponent {

settlementData = input<{
settlement: string,
windSpeed: number,
maxSize: number,
continent: string| number,
region: string| number,
area: string |number,}
>();
}