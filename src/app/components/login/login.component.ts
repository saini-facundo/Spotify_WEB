import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
  }

  title = 'Spotify-WEB';

  constructor(
    private spotifyService: SpotifyService
  ) {

  }

  redirectToSpotifyAuth() {
    this.spotifyService.redirectUserToSpotify();
  }

}
