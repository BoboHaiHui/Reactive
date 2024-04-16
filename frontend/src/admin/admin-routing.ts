import { Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { RolesComponent } from './components/roles/roles.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UsersComponent } from './components/users/users.component';

export const AdminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  }
];
