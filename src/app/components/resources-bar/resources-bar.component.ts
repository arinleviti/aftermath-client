import { Component, input } from '@angular/core';

@Component({
  selector: 'app-resources-bar',
  imports: [],
  templateUrl: './resources-bar.component.html',
  styleUrl: './resources-bar.component.css',
  inputs: ['resources']  // ✅ New Angular 17+ syntax
})
export class ResourcesBarComponent {
  resources!: { metal: number; water: number; oil: number; energy: number; uranium: number };
}
