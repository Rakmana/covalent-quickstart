import {Injectable} from '@angular/core';

import { environment } from '../../environments/environment';
import * as Keycloak from 'keycloak-js';
//declare var Keycloak: any;

@Injectable()
export class KeycloakService {
  static auth: any = {};

  static init(): Promise<any> {
    const keycloakAuth: any = Keycloak({
      url: environment.keykloakBaseUrl,
      realm: 'master',
      clientId: 'rak-ui-ng',
    });

    KeycloakService.auth.loggedIn = false;

    return new Promise((resolve, reject) => {
      keycloakAuth.init({ onLoad: 'check-sso'/*'login-required'*/ })
      .success(() => {
        KeycloakService.auth.loggedIn = true;
        KeycloakService.auth.authz = keycloakAuth;
        KeycloakService.auth.logoutUrl = keycloakAuth.authServerUrl
          + '/realms/master/protocol/openid-connect/logout?redirect_uri='
          + document.baseURI;
        resolve();
      })
      .error(() => {
        reject();
      });
    });
  }

  logout() {
    console.log('*** LOGOUT');
    KeycloakService.auth.loggedIn = false;
    KeycloakService.auth.authz = null;

    window.location.href = KeycloakService.auth.logoutUrl;
  }  
  
  login() {
    console.log('*** LOGIN');
    KeycloakService.auth.authz.login();
  }

  getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (KeycloakService.auth.authz.token) {
        KeycloakService.auth.authz
          .updateToken(5)
          .success(() => {
            resolve(<string>KeycloakService.auth.authz.token);
          })
          .error(() => {
            reject('Failed to refresh token');
          });
      } else {
        reject('Not loggen in');
      }
    });
  }


  getProfile(): Promise<any> {


    return new Promise<any>((resolve, reject) => {
      if (KeycloakService.auth.authz.token) {
        KeycloakService.auth.authz
          .loadUserProfile()
          .success(() => {
            resolve(<any>KeycloakService.auth.authz.profile);
          })
          .error((e) => {
            reject('Failed to load profile. '+e);
          });
      } else {
        reject('Not loggen in');
      }
    });
  }
}
