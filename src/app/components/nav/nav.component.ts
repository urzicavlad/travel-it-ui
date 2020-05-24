import {Component, OnInit} from '@angular/core';
import {CookieUtilsService} from '../../common/cookie-utils-service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  appTitle = 'TRAVEL-IT';

  constructor(private cookieUtilsService: CookieUtilsService,) {
  }

  ngOnInit() {
  }

  toggleMenu() {
    const menu = document.querySelector('.menu');
    const iconMenu = document.querySelector('.icon-menu');
    if (menu.classList.contains('open')) {
      menu.classList.add('close');
      iconMenu.classList.remove('icon-closed');

      setTimeout(() => {
        menu.classList.remove('open');
      }, 1300);

    } else {
      menu.classList.remove('close');
      menu.classList.add('open');
      iconMenu.classList.add('icon-closed');
    }
  }

  openSubmenu(event) {
    if (event.currentTarget.classList.contains('active')) {
      event.currentTarget.classList.remove('active');
    } else {
      event.currentTarget.classList.add('active');
    }
  }

  getUser() {
    return this.cookieUtilsService.getCookie('user-logged');
  }

  logOut() {
    this.cookieUtilsService.eraseCookie('user-logged');
  }
}
