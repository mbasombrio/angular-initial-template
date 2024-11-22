import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      title: 'dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Main', url: '/' },
        { title: 'Progress Bar', url: '/dashboard/progress' },
        { title: 'Graficas', url: '/dashboard/grafica' },
        { title: 'Promesas', url: '/dashboard/promesas' },
      ],
    },
    {
      title: 'Mantenimientos',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'Usuarios', url: 'usuarios' },
        { title: 'Hospitales', url: 'hospitales' },
        { title: 'Medicos', url: 'medicos' },
      ],
    },
  ];

  constructor() {}
}
