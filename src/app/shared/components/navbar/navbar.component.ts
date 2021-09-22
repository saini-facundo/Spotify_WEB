import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LastVisitedScreenService } from '../../../services/last-visited-screen.service';
import { SpotifyService } from '../../../services/spotify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private lastVisitedScreenService: LastVisitedScreenService,
    public spotifyService: SpotifyService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.spotifyService.logOut()
    this.lastVisitedScreenService.resetToken();
    this.router.navigate(['/login']);
  }

}
