import { AngularMaterialModule } from 'src/shared/angularMaterial.module';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminRoutes } from './admin-routing';
import { AdminComponent } from './admin.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { UsersComponent } from './components/users/users.component';
import { RolesComponent } from './components/roles/roles.component';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  imports: [HttpClientModule, CommonModule, AngularMaterialModule, RouterModule.forChild(AdminRoutes)],
  exports: [],
  declarations: [AdminComponent, AdminNavbarComponent, UsersComponent, RolesComponent, SettingsComponent]
})
export class AdminModule {}
