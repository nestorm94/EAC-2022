import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { SettingsService } from '../../core/services/settings.service';
import { Router } from '@angular/router';


function getWindow (): any {
  return window;
}

@Injectable()
export class TokenManagerService {
  TOKEN = '';
  public subjectRefreshToken: Subject<any> = new Subject();
  tokenExpirated = true;

  constructor(public settings: SettingsService,
    public router: Router) {
  }

  isAuthenticate() {
    return !this.tokenExpirated;
  }

  public getCurrentOption() {
    const param = this.nativeWindow.localStorage.navApp;
    return (param === undefined) ? null : JSON.parse(this.nativeWindow.localStorage.navApp);
  }

  public setCurrentOption(object) {
      this.nativeWindow.localStorage.navApp = JSON.stringify(object);
      this.nativeWindow.localStorage.params = JSON.stringify(object.param);
  }

  public setToken(_token): Promise<boolean> {
    return new Promise(( resolve: (res: boolean) => void, reject: (res: boolean) => void) => {
          const res = false;
          this.settings.user.profile = _token.perfil;
          this.settings.user.name = _token.nombre;
          this.settings.user.picture = _token.imgPerfil;
          this.TOKEN = _token.token;
          this.nativeWindow.localStorage.token = _token.token;
		  this.nativeWindow.localStorage.refreshToken = _token.refreshToken;
          this.tokenExpirated = false;
          this.expirationTime(_token.timeOut);
          setTimeout(function() {
              resolve(res);
          }, 3000);
      });

  }

  setTokenExpirated() {
    console.log('tokenExpirated');
    this.tokenExpirated = true;
  }

  getToken() {
    //this.TOKEN = localStorage.getItem('token')
    //console.log(this.TOKEN, 'VALIDANDO TOKEN')
    return (this.TOKEN === '') ? this.TOKEN = this.nativeWindow.localStorage.getItem('token') : this.TOKEN ;
  }

  getRefreshToken() {
    return this.nativeWindow.localStorage.refreshToken;
  }

  resetToken() {
    this.TOKEN = '';
    this.nativeWindow.localStorage.token = '';
    this.nativeWindow.localStorage.refreshToken = '';
    this.nativeWindow.localStorage.removeItem('token');
    this.nativeWindow.localStorage.removeItem('refreshToken');
    this.nativeWindow.localStorage.removeItem('setToken');
    this.nativeWindow.localStorage.removeItem('navApp');
    this.nativeWindow.localStorage.removeItem('moduloSelecc');
    this.nativeWindow.localStorage.removeItem('iteracion');
    this.nativeWindow.localStorage.removeItem('length');
    this.nativeWindow.localStorage.removeItem('menuItemSelecc');
    this.nativeWindow.localStorage.removeItem('params');
    this.nativeWindow.localStorage.removeItem('refreskF5');
    this.nativeWindow.localStorage.removeItem('ngStorage-layout');
  }

  cargarStatus(){
    this.nativeWindow.localStorage.statusService = "Token Invalido";
  }

  expirationTime(time) {
    setTimeout(() => {
      this.setTokenExpirated();
    }, time * 100);
  }

  processRefreshToken() {
    console.log('refresh_token');
    this.subjectRefreshToken.next(this.nativeWindow.localStorage.token);
  }

  get nativeWindow (): any {
    return getWindow();
  }
}