import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { Album } from '../../interfaces/album.interface';
import { Artist } from '../../interfaces/artist.interface';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
  ) { }

  artistId: any;
  artist: Artist = {
    external_urls: undefined,
    followers: undefined,
    genres: [],
    href: '',
    id: '',
    images: [],
    name: '',
    popularity: 0,
    type: '',
    uri: ''
  };
  artistAlbums: Album[] = [];



  ngOnInit(): void {

    this.artistId = this.route.snapshot.paramMap.get('id');

    this.spotifyService.getArtist(this.artistId).subscribe((artist) => {
      this.artist = artist;
    });

    this.spotifyService.getArtistsAlbums(this.artistId).subscribe((albums: Album[]) => {
      this.artistAlbums = albums;
      this.spotifyService.checkSavedAlbums([this.artistAlbums[0].id]).subscribe();
    });

  }

}
