import { Component, ElementRef, Inject, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { Title,  DOCUMENT }     from '@angular/platform-browser';
import {KeycloakService} from '../keycloak/keycloak.service';

@Component({
  selector: 'qs-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
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


  public profile:Object = {
    'firstName':'xxx',
    'lastName':'xxx',
    'email': 'xxx.xxx@xxx.xx'
  };

  constructor(private _router: Router,
              private _renderer: Renderer,
               @Inject(DOCUMENT) private _document: HTMLElement, 
              private kc: KeycloakService) {
                this.loadProfile();
              }

  changeDir(dir: string): void {
     this._renderer.setElementAttribute(this._document.querySelector('html'), 'dir', dir);
  }
  login(): void {
    this.kc.login();
    this._router.navigate(['/']);
  }

  logout(): void {
    this.kc.logout();
    this._router.navigate(['/login']);
  }

  loadProfile():void {
    var that = this;
    this.kc.getProfile().then(function(profile){
      that.profile = profile;
    console.log('PROFILE: ',profile);
    })
  }
}
