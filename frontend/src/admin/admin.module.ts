import { AngularMaterialModule } from 'src/shared/angularMaterial.module';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminRoutes } from './admin-routing';
import { AdminComponent } from './admin.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { RolesComponent } from './components/roles/roles.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UsersComponent } from './components/users/users.component';
import { AdminService } from './services/admin.service';

@NgModule({
  imports: [HttpClientModule, CommonModule, AngularMaterialModule, RouterModule.forChild(AdminRoutes)],
  exports: [],
  providers: [AdminService],
  declarations: [AdminComponent, AdminNavbarComponent, UsersComponent, RolesComponent, SettingsComponent]
})
export class AdminModule {}
