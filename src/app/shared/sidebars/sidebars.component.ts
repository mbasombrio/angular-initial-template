import { Component, computed, inject } from '@angular/core';
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

  usuario = this.userService.user;
  imgUrl = computed(() => this.usuario().imageUrl || '');
  menuItems = this.sidebarService.menu;
}
