import { Routes } from '@angular/router';

import { pagesRoutes } from '@routes/pages-routes';
import { authRoutes } from '@routes/auth-routes';
import { NopagefoundComponent } from '@404/nopagefound/nopagefound.component';


export const routes: Routes = [
  ...pagesRoutes,
  ...authRoutes,
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', component: NopagefoundComponent}
];
