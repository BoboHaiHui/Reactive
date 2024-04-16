import { AngularMaterialModule } from 'src/shared/angularMaterial.module';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProfileComponent } from './components/profile/profile.component';
import { UserNavbarComponent } from './components/user-navbar/user-navbar.component';
import { UserService } from './services/user.service';
import { UserRoutes } from './user-routing';
import { UserComponent } from './user.component';
import { ToolsComponent } from './components/tools/tools.component';
import { ArticlesComponent } from './components/articles/articles.component';

@NgModule({
  imports: [AngularMaterialModule, HttpClientModule, CommonModule, RouterModule.forChild(UserRoutes)],
  exports: [],
  providers: [UserService],
  declarations: [UserComponent, UserNavbarComponent, ProfileComponent, ToolsComponent, ArticlesComponent]
})
export class UserModule {}
