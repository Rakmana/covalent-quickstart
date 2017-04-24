import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {KeycloakService} from '../keycloak/keycloak.service';

@Component({
  selector: 'qs-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {

  routes: Object[] = [{
      title: 'Dashboard',
      route: '/',
      icon: 'dashboard',
    }, {
      title: 'Product Dashboard',
      route: '/product',
      icon: 'view_quilt',
    }, {
      title: 'Product Logs',
      route: '/logs',
      icon: 'receipt',
    }, {
      title: 'Manage Users',
      route: '/users',
      icon: 'people',
    }, {
      title: 'Covalent Templates',
      route: '/templates',
      icon: 'view_module',
    },
  ];

  constructor(private _router: Router, 
              private kc: KeycloakService) {}

  logout(): void {
    this.kc.logout();
    this._router.navigate(['/login']);
  }
}
