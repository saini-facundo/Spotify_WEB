import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LastVisitedScreenService } from 'src/app/services/last-visited-screen.service';
import { Session } from 'src/app/interfaces/session.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private spotifyService: SpotifyService,
    private router: Router,
    private toastrService: ToastrService,
    private lastVisitedService: LastVisitedScreenService,
  ) {

  }

  ngOnInit(): void {

    this.goToLastVisitedScreen();

  }

  lastSession: Session = {
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

  goToLastVisitedScreen() {
    if (this.lastVisitedService.getLastVisitedScreen().token.access_token != "") {
      this.lastSession = this.lastVisitedService.getLastVisitedScreen();
      this.spotifyService.getLastSession(this.lastSession);
      this.router.navigate([this.lastSession.screen]);
    } else {
      this.getUserData();
    }

  }

  getRefreshAndAccessToken() {
    this.spotifyService.requestRefreshAndAccessToken().subscribe((data: any) => {
      this.spotifyService.getUserInfo().subscribe(
        (_) => {
          this.router.navigate(['/search']);
        },
        (error) => {
          this.toastrService.error(`${error.message}`, "Error");
        }
      );
    });
  }

  getUserData() {
    this.spotifyService.extractCodeFromUrl();
    if (this.spotifyService.getCode != "") {
      this.getRefreshAndAccessToken();
    }

  }



  redirectToSpotifyAuth() {
    this.spotifyService.redirectUserToSpotify();
  }

}
