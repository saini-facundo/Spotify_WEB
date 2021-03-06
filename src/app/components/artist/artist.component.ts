import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { Album } from '../../interfaces/album.interface';
import { Artist } from '../../interfaces/artist.interface';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { LastVisitedScreenService } from 'src/app/services/last-visited-screen.service';
@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    private matIconRegistry: MatIconRegistry,
    private domSanitzer: DomSanitizer,
    private toastrService: ToastrService,
    private lastVisited: LastVisitedScreenService
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

    this.spotifyService.getArtist(this.artistId).subscribe(
      (artist) => {
        this.artist = artist;
      },
      (error) => {
        this.toastrService.error(`${error.message}`, "Error");
      }
    );

    this.spotifyService.getArtistsAlbums(this.artistId).subscribe(
      (albums: Album[]) => {
        this.artistAlbums = albums;
        this.artistAlbums.forEach(album => {
          this.checkIfFav(album);
        });
      },
      (error) => {
        this.toastrService.error(`${error.message}`, "Error");
      }
    );
    
    this.lastVisited.setLastVisitedScreen();

    this.matIconRegistry.addSvgIcon(
      'heart-regular',
      this.domSanitzer.bypassSecurityTrustResourceUrl('../../../assets/heart-regular.svg'));

    this.matIconRegistry.addSvgIcon(
      'heart-solid',
      this.domSanitzer.bypassSecurityTrustResourceUrl('../../../assets/heart-solid.svg'));
  }

  checkIfFav(album: Album) {
    this.spotifyService.checkSavedAlbums([album.id]).subscribe((data) => { album.isFav = data[0]; });
  }

  saveAlbum(album: Album) {
    this.spotifyService.saveAlbum(album.id).subscribe(
      (_) => {
        this.checkIfFav(album);
      },
      (error) => {
        this.toastrService.error(`${error.message}`, "Error");
      }
    );
  }

  deleteAlbum(album: Album) {
    this.spotifyService.removeAlbum(album.id).subscribe(
      (_) => {
        this.checkIfFav(album);
      },
      (error) => {
        this.toastrService.error(`${error.message}`, "Error");
      }
    );
  }

}
