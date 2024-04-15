import { ProfileStore } from 'src/shared/stores/profileUserData.store';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor(private profileData: ProfileStore) {}

  ngOnInit(): void {}
}
