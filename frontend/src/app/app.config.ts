import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

export const appConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),  // <-- ajoute ça
  ],
};

