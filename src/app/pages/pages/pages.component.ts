import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbsComponent } from '@shared/breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from '@shared/header/header.component';
import { SidebarsComponent } from '@shared/sidebars/sidebars.component';

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
  year: number = new Date().getFullYear();
  themeLink = document.querySelector('#theme');

  ngOnInit(): void {
    const theme = localStorage.getItem('theme');

    if (this.themeLink) {
      this.themeLink.setAttribute(
        'href',
        theme || 'css/colors/default-dark.css'
      );
    }
  }
}
