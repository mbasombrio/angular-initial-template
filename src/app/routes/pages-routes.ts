import { Routes } from '@angular/router';
import { authGuard } from '@guards/auth.guard';
import { AccountSettingsComponent } from '@pages/account-settings/account-settings.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { GraficaComponent } from '@pages/grafica/grafica.component';
import { PagesComponent } from '@pages/pages/pages.component';
import { ProgressComponent } from '@pages/progress/progress.component';
import { PromesasComponent } from '@pages/promesas/promesas.component';
import { PerfilComponent } from '@pages/perfil/perfil.component';
import { UsuariosComponent } from '@pages/mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from '@pages/mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from '@pages/mantenimientos/medicos/medicos.component';
import { MedicoComponent } from '@pages/mantenimientos/medico/medico.component';
import { BusquedasComponent } from '@pages/busquedas/busquedas.component';

export const pagesRoutes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { title: 'ProgressBar' },
      },
      {
        path: 'grafica',
        component: GraficaComponent,
        data: { title: 'Grafica' },
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { title: 'Ajuste de cuentas' },
      },
      {
        path: 'promesas',
        component: PromesasComponent,
        data: { title: 'Promesas' },
      },
      {
        path: 'profile',
        component: PerfilComponent,
        data: { title: 'Perfil' },
      },
      {
        path: 'busquedas/:termino',
        component: BusquedasComponent,
        data: { title: 'Resultado Busqueda' },
      },

      {
        path: 'usuarios',
        component: UsuariosComponent,
        data: { title: 'Usuarios' },
      },

      {
        path: 'hospitales',
        component: HospitalesComponent,
        data: { title: 'Hospitales' },
      },
      {
        path: 'medicos',
        component: MedicosComponent,
        data: { title: 'Medicos' },
      },

      {
        path: 'medico/:id',
        component: MedicoComponent,
        data: { title: 'Medico' },
      },
    ],
  },
];
