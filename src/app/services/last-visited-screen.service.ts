import { Injectable } from '@angular/core';
import { SpotifyService } from './spotify.service';
import { Session } from '../interfaces/session.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LastVisitedScreenService {

  constructor(
    private spotifyService: SpotifyService,
    private router: Router
  ) { }

  public setLastVisitedScreen() {
    localStorage.setItem("lastVisitedScreen", this.router.url);
    this.setLastUserToken();
  }

  public getLastVisitedScreen(): Session {
    let lastSession: Session = {
      screen: '',
      token: {
        access_token: '',
        token_type: '',
        scope: '',
        expires_in: 0,
        refresh_token: ''
      },
      user: {
        country: '',
        display_name: '',
        email: '',
        explicit_content: { filter_enabled: false, filter_locked: false },
        external_urls: { spotify: '' },
        followers: { href: null, total: 0 },
        href: '',
        id: '',
        images: [''],
        product: '',
        type: '',
        uri: '',
      },
      userCode: ''
    };
    if (localStorage.getItem("lastToken") != null) {
      lastSession = {
        screen: localStorage.getItem("lastVisitedScreen")!,
        user: JSON.parse(localStorage.getItem("lastUser")!),
        token: JSON.parse(localStorage.getItem("lastToken")!),
        userCode: localStorage.getItem("lastCode")!
      };
    };
    return lastSession;
  }

  setLastUserToken() {
    if (this.spotifyService.getToken.access_token) {
      localStorage.setItem("lastToken", JSON.stringify(this.spotifyService.getToken));
      localStorage.setItem("lastUser", JSON.stringify(this.spotifyService.getUser));
      localStorage.setItem("lastCode", JSON.stringify(this.spotifyService.getCode));
    }

  }

}
