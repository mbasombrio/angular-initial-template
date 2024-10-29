import { Routes } from '@angular/router';
import { AccountSettingsComponent } from '@pages/account-settings/account-settings.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { GraficaComponent } from '@pages/grafica/grafica.component';
import { PagesComponent } from '@pages/pages/pages.component';
import { ProgressComponent } from '@pages/progress/progress.component';

export const pagesRoutes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'grafica', component: GraficaComponent },
      { path: 'account-settings', component: AccountSettingsComponent },
    ],
  },
];
