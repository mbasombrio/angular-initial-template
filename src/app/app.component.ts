import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { SidebarsComponent } from "./shared/sidebars/sidebars.component";
import { BreadcrumbsComponent } from "./shared/breadcrumbs/breadcrumbs.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarsComponent, BreadcrumbsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'adminpro';
}
