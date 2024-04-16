import { Routes } from '@angular/router';

import { ArticlesComponent } from './components/articles/articles.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ToolsComponent } from './components/tools/tools.component';
import { UserComponent } from './user.component';

export const UserRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'tools', component: ToolsComponent },
      { path: 'articles', component: ArticlesComponent }
    ]
  }
];
