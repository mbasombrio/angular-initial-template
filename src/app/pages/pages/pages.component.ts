import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { SidebarsComponent } from "../../shared/sidebars/sidebars.component";
import { BreadcrumbsComponent } from "../../shared/breadcrumbs/breadcrumbs.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarsComponent, BreadcrumbsComponent],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent {
  year: number = new Date().getFullYear();
}
