import { HomeComponent } from 'src/general-pages/home/home.component';
import { NavbarComponent } from 'src/shared/components/navbar/navbar.component';
import { ProfileService } from 'src/shared/services/profile.service';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private profileService: ProfileService){

  }
 }
