import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarService } from '@services/sidebar.service';

@Component({
  selector: 'app-sidebars',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebars.component.html',
  styleUrl: './sidebars.component.scss',
})
export class SidebarsComponent {
  private sidebarService = inject(SidebarService);
  menuItems = this.sidebarService.menu;
}
