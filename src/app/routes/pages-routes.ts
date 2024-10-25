import { Routes } from '@angular/router';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { GraficaComponent } from '@pages/grafica/grafica.component';
import { PagesComponent } from '@pages/pages/pages.component';
import { ProgressComponent } from '@pages/progress/progress.component';



export const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'grafica', component: GraficaComponent },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  }
];
