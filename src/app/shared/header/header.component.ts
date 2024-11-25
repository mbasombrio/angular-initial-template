import { Component, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '@services/user.service';
import { SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, SlicePipe, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  userService = inject(UserService);
  router = inject(Router);
  usuario = this.userService.user;

  logout() {
    this.userService.logout();
  }

  buscar(value: string) {
    this.router.navigateByUrl(`/dashboard/busquedas/${value}`);
  }
}
