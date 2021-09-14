import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private spotifyService: SpotifyService,
    private router: Router
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!this.spotifyService.isUserLogged) {
      this.router.navigateByUrl('/login');
    }
    return this.spotifyService.isUserLogged;
  }

}
