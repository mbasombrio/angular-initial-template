import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarService } from '@services/sidebar.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-sidebars',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebars.component.html',
  styleUrl: './sidebars.component.scss',
})
export class SidebarsComponent {
  private sidebarService = inject(SidebarService);
  private userService = inject(UserService);
  imgUrl = this.userService.user?.imageUrl || '';
  usuario = this.userService.user;
  menuItems = this.sidebarService.menu;
}
