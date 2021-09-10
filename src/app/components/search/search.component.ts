import { Component, OnInit } from '@angular/core';
import { Token } from 'src/app/interfaces/token.inteface';
import { SpotifyService } from 'src/app/services/spotify.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    private spotifyService: SpotifyService
  ) {
    this.extractCodeFromUrl();
  }

  ngOnInit(): void {
  }

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

  userImg = "";

  searchTerm = "";

  artists: any[] = [];

  getRefreshAndAccessToken(code: string) {
    this.spotifyService.requestRefreshAndAccessToken(code).subscribe((data: any) => {
      this.token = data;
      console.log('TOKEN  :', this.token);
      this.spotifyService.getUserInfo(this.token).subscribe((userResponse: any) => {
        this.user = userResponse;
        this.userImg = this.user.images[0].url;
        console.log('IMAGE  :', this.userImg);
        console.log('USER : ', this.user);
      });
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

  search(term: string) {
    if (term.length > 2) {
      this.spotifyService.searchArtist(term, this.token).subscribe((artists: any) => {
        this.artists = artists;
      });
    }
  }

}
