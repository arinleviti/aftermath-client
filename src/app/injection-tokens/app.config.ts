import { InjectionToken } from '@angular/core';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
  providedIn: 'root',
  factory: () => 'https://afmserver-ajd7avc9ddbjhtam.germanywestcentral-01.azurewebsites.net/Aftermath'
});
