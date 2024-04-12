import { ProfileStore } from 'src/shared/stores/profileUserData.store';

import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private profileStore: ProfileStore) {}

  showUser() {
    console.log(this.profileStore);
  }
}
