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
  ];

  constructor() {}
}
