import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Token } from '../interfaces/token.inteface';
import { map } from "rxjs/operators";
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import { Session } from '../interfaces/session.interface';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(
    private http: HttpClient
  ) {
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

  userCode = "";

  headers: any;

  public get isUserLogged(): boolean {
    return this.userLogged;
  }

  public setIsUserLogged(isLogged: boolean) {
    this.userLogged = isLogged;
  }

  public get getUser(): User {
    return this.user;
  }

  public get getToken(): Token {
    return this.token;
  }

  public setToken(token: any) {
    this.token = token;
  }

  public get getCode(): string {
    return this.userCode;
  }

  redirectUserToSpotify() {

    const url = `https://accounts.spotify.com/authorize?client_id=7476fa75797740148fe7ed759ebd83d6&redirect_uri=http://localhost:4200/login&scope=user-read-private%20user-read-email%20user-library-read%20user-library-modify&response_type=code&state=123&show_dialog=true`;
    window.location.href = url;

  }

  logOut() {
    this.setIsUserLogged(false);
    const url = ' https://accounts.spotify.com/en/logout';
    const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=400,height=400,margin=auto');
    setTimeout(() => spotifyLogoutWindow!.close(), 2000);
  }

  extractCodeFromUrl() {
    const search = window.location.search;

    if (search.includes('?code=')) {
      this.userCode = search.substring(
        search.indexOf('?code=') + 6,
        search.indexOf('&state=')
      );
    }

  }

  requestRefreshAndAccessToken() {

    const url = `https://accounts.spotify.com/api/token`;

    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', this.userCode)
      .set('redirect_uri', 'http://localhost:4200/login')
      .set('client_id', '7476fa75797740148fe7ed759ebd83d6')
      .set('client_secret', 'b5b8fb3815d34a2b852f88621311331b');

    return this.http.post(url, body).pipe(
      map((data: any) => {
        this.token = data;
        this.headers = new HttpHeaders({
          'Authorization': `Bearer ${this.token.access_token}`
        });
        return data;
      }),
    );

  }

  getUserInfo(): Observable<User> {

    const url = `https://api.spotify.com/v1/me`;

    return this.http.get(url, { headers: this.headers })
      .pipe(
        map((data: any) => {
          if (data.id) {
            this.userLogged = true;
          }
          this.user = data;
          return data;
        }),
      );

  }

  getLastSession(session: Session) {
    this.token = session.token;
    this.user = session.user;
    this.userLogged = true;
    this.userCode = session.userCode;
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token.access_token}`
    });
  }

  searchArtist(term: string) {

    const url = `https://api.spotify.com/v1/search?q=${term}&type=artist`;

    return this.http.get(url, { headers: this.headers })
      .pipe(
        map((data: any) => { return data.artists.items; })
      );

  }

  getArtist(id: string) {

    const url = `https://api.spotify.com/v1/artists/${id}`;

    return this.http.get(url, { headers: this.headers })
      .pipe(
        map((data: any) => { return data; })
      );

  }

  getArtistsAlbums(id: string) {

    const url = `	https://api.spotify.com/v1/artists/${id}/albums`;

    return this.http.get(url, { headers: this.headers })
      .pipe(
        map((data: any) => { return data.items; })
      );

  }

  checkSavedAlbums(albumsIds: string[]) {

    const url = `https://api.spotify.com/v1/me/albums/contains?`;

    const params = new HttpParams()
      .set('ids', albumsIds.toString());

    return this.http.get(url, { headers: this.headers, params: params })
      .pipe(
        map((data: any) => { return data; })
      );

  }

  saveAlbum(albumId: string) {

    const url = `https://api.spotify.com/v1/me/albums`;

    const params = new HttpParams()
      .set('ids', albumId);

    return this.http.put(url, {}, { headers: this.headers, params: params });

  }

  removeAlbum(albumId: string) {
    const url = `https://api.spotify.com/v1/me/albums`;

    const params = new HttpParams()
      .set('ids', albumId);

    return this.http.delete(url, { headers: this.headers, params: params });
  }

}
