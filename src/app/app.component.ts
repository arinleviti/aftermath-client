import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SettlementHomeComponent } from './settlement/settlement-home/settlement-home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ SettlementHomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'aftermath-client';
}
