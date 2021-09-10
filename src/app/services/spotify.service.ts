import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Token } from '../interfaces/token.inteface';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  redirectUserToSpotify() {
    const url = `https://accounts.spotify.com/authorize?client_id=7476fa75797740148fe7ed759ebd83d6&redirect_uri=http://localhost:4200/search&scope=user-read-private%20user-read-email&response_type=code&state=123`;
    window.location.href = url;

  }

  requestRefreshAndAccessToken(code: string) {
    const url = `https://accounts.spotify.com/api/token`;
    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', 'http://localhost:4200/search')
      .set('client_id', '7476fa75797740148fe7ed759ebd83d6')
      .set('client_secret', 'b5b8fb3815d34a2b852f88621311331b');

    return this.http.post(url, body);
  }

  getUserInfo(token: Token) {

    const url = `https://api.spotify.com/v1/me`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token.access_token}`
    });
    return this.http.get(url, { headers });

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
