import { Routes } from '@angular/router';

import { ProfileComponent } from './components/profile/profile.component';
import { UserComponent } from './user.component';

export const UserRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [{ path: 'profile', component: ProfileComponent }]
  }
];
