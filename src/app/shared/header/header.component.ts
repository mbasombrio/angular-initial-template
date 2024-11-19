import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '@services/user.service';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, SlicePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  userService = inject(UserService);
  usuario = this.userService.user;
  imgUrl =  '';


  constructor() {
    this.imgUrl = this.userService.user?.imageUrl || '';
  }

  logout() {
    this.userService.logout();
  }


}
