import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.scss',
})
export class AccountSettingsComponent implements OnInit {
  public themeLink = document.querySelector('#theme');
  public links!: NodeListOf<Element>;

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();
  }

  changeTheme(theme: string) {
    console.log(theme);

    if (this.themeLink) {
      const url = `css/colors/${theme}.css`;
      this.themeLink.setAttribute('href', url);
      localStorage.setItem('theme', url);
      this.checkCurrentTheme();
    }
  }

  checkCurrentTheme() {
    this.links.forEach((link: Element) => {
      link.classList.remove('working');
      const btnTheme = link.getAttribute('data-theme');
      const currentTheme = localStorage.getItem('theme');

      if (currentTheme === `css/colors/${btnTheme}.css`) {
        link.classList.add('working');
      }
    });
  }
}
