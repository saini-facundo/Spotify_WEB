import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private spotifyService: SpotifyService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.extractCodeFromUrl();
  }

  getRefreshAndAccessToken(code: string) {
    this.spotifyService.requestRefreshAndAccessToken(code).subscribe((data: any) => {
      this.spotifyService.getUserInfo().subscribe(
        (_) => {
          this.router.navigate(['/search']);
        }
      );
    });
  }

  extractCodeFromUrl() {
    const search = window.location.search;
    let code = "";
    if (search.includes('?code=')) {
      code = search.substring(
        search.indexOf('?code=') + 6,
        search.indexOf('&state=')
      );
    }
    if (code != "") {
      this.getRefreshAndAccessToken(code);
    }

  }



  redirectToSpotifyAuth() {
    this.spotifyService.redirectUserToSpotify();
  }

}
