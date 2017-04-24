import { Component, AfterViewInit, ElementRef, Inject, Renderer } from '@angular/core';

import { Title,  DOCUMENT } from '@angular/platform-browser';

import { TdMediaService } from '@covalent/core';
import {KeycloakService} from '../keycloak/keycloak.service';

@Component({
  selector: 'qs-dashboard-product',
  templateUrl: './dashboard-product.component.html',
  styleUrls: ['./dashboard-product.component.scss'],
})
export class DashboardProductComponent implements AfterViewInit {

  title: string;
  constructor(private _titleService: Title, 
              private kc: KeycloakService,
              public media: TdMediaService,
              private _renderer: Renderer,
               @Inject(DOCUMENT) private _document: HTMLElement) { }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();

    this._titleService.setTitle( 'لوحة تحكم المنتجات' );
    this.title = this._titleService.getTitle();
  }

  
   changeDir(dir: string): void {
     this._renderer.setElementAttribute(this._document.querySelector('html'), 'dir', dir);
   }
   logout():void {
     this.kc.logout();
   }


}
