import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nopagefound',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nopagefound.component.html',
  styleUrl: './nopagefound.component.scss'
})
export class NopagefoundComponent {
  year = new Date().getFullYear();
}
