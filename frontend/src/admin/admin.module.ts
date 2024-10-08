import { AngularMaterialModule } from 'src/shared/angularMaterial.module';
import { SharedModule } from 'src/shared/shared.module';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AdminRoutes } from './admin-routing';
import { AdminComponent } from './admin.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { UpdateUserDialogComponent } from './components/dialogs/update-user-dialog/update-user-dialog.component';
import { RolesComponent } from './components/roles/roles.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UsersComponent } from './components/users/users.component';
import { AdminService } from './services/admin.service';
import { RoleService } from './services/role.service';
import { UpdateRoleDialogComponent } from './components/dialogs/update-role-dialog/update-role-dialog/update-role-dialog.component';
import { CreateRoleDialogComponent } from './components/dialogs/create-role-dialog/create-role-dialog.component';

@NgModule({
  imports: [HttpClientModule, CommonModule, AngularMaterialModule, RouterModule.forChild(AdminRoutes), SharedModule, FormsModule],
  exports: [],
  providers: [AdminService, RoleService],
  declarations: [
    AdminComponent,
    AdminNavbarComponent,
    UsersComponent,
    RolesComponent,
    SettingsComponent,
    UpdateUserDialogComponent,
    UpdateRoleDialogComponent,
    CreateRoleDialogComponent
  ]
})
export class AdminModule {}
