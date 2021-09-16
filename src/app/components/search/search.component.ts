import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    public spotifyService: SpotifyService,
    private router: Router,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
  }

  userImg = "";

  searchTerm = "";

  artists: any[] = [];

  search(term: string) {
    if (term.length > 2) {
      this.spotifyService.searchArtist(term).subscribe(
        (artists: any) => {
          this.artists = artists;
        },
        (error) => {
          this.toastrService.error(`${error.message}`, "Error");
        }
      );
    }
  }

  cleanList(searchTerm: HTMLInputElement) {
    searchTerm.value = "";
    this.artists = [];
  }

  navigateToArtist(artistId: string) {
    this.router.navigate(['/artist', artistId]);
  }
}