import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SettingsService } from '@services/settings.service';
import { BreadcrumbsComponent } from '@shared/breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from '@shared/header/header.component';
import { SidebarsComponent } from '@shared/sidebars/sidebars.component';

declare function customInitFunctions(): void;

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarsComponent,
    BreadcrumbsComponent,
  ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss',
})
export class PagesComponent implements OnInit {
  settingsService = inject(SettingsService);
  year: number = new Date().getFullYear();

  ngOnInit(): void {
    customInitFunctions();
  }
}
