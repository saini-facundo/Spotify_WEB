import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from "@angular/material/slider";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";
import { SpotifyService } from './services/spotify.service';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';
import { ArtistComponent } from './components/artist/artist.component';
import { ToastrModule } from 'ngx-toastr';
import { NoimagePipe } from './pipes/noimage.pipe';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent,
    ArtistComponent,
    NoimagePipe,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    ToastrModule.forRoot()
  ],
  providers: [SpotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
