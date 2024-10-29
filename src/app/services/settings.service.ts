import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private themeLink = document.querySelector('#theme');

  constructor() {
    const theme = localStorage.getItem('theme');

    if (this.themeLink) {
      this.themeLink.setAttribute(
        'href',
        theme || 'css/colors/default-dark.css'
      );
    }
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
    const links = document.querySelectorAll('.selector');
    links.forEach((link: Element) => {
      link.classList.remove('working');
      const btnTheme = link.getAttribute('data-theme');
      const currentTheme = localStorage.getItem('theme');

      if (currentTheme === `css/colors/${btnTheme}.css`) {
        link.classList.add('working');
      }
    });
  }
}
