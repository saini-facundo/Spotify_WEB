import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Token } from '../interfaces/token.inteface';
import { map } from "rxjs/operators";
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient,
    private router: Router) {
  }

  private userLogged: boolean = false;

  token: Token = {
    access_token: '',
    token_type: '',
    scope: '',
    expires_in: 0,
    refresh_token: ''
  };

  user: User = {
    country: '',
    display_name: '',
    email: '',
    explicit_content: {
      filter_enabled: false,
      filter_locked: false
    },
    external_urls: {
      spotify: ''
    },
    followers: {
      href: null,
      total: 0
    },
    href: '',
    id: '',
    images: [{}],
    product: '',
    type: '',
    uri: ''
  };

  redirectUserToSpotify() {
    const url = `https://accounts.spotify.com/authorize?client_id=7476fa75797740148fe7ed759ebd83d6&redirect_uri=http://localhost:4200/login&scope=user-read-private%20user-read-email&response_type=code&state=123`;
    window.location.href = url;
  }

  requestRefreshAndAccessToken(code: string) {
    const url = `https://accounts.spotify.com/api/token`;
    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', 'http://localhost:4200/login')
      .set('client_id', '7476fa75797740148fe7ed759ebd83d6')
      .set('client_secret', 'b5b8fb3815d34a2b852f88621311331b');

    return this.http.post(url, body).pipe(
      map((data: any) => {
        this.token = data;
        return data;
      }),
    );;
  }

  getUserInfo(token: Token): Observable<User> {
    const url = `https://api.spotify.com/v1/me`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token.access_token}`
    });
    return this.http.get(url, { headers })
      .pipe(
        map((data: any) => {
          if (data.id) {
            this.userLogged = true;
          }
          this.user = data;
          this.router.navigate(['/search']);
          return data;
        }),
      );
  }


  public get isUserLogged(): boolean {
    return this.userLogged;
  }

  public get getUser(): User {
    return this.user;
  }

  public get getToken(): Token {
    return this.token;
  }



  searchArtist(term: string, token: Token) {
    const url = `https://api.spotify.com/v1/search?q=${term}&type=artist`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token.access_token}`
    });
    return this.http.get(url, { headers })
      .pipe(
        map((data: any) => { return data.artists.items; })
      );
  }
}
