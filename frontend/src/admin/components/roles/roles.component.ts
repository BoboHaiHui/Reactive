import { IFullProfileUserData } from 'src/admin/interfaces/admin.interfaces';
import { ConfirmationDialogComponent } from 'src/shared/components/dialogs/confirmation-dialog/confirmation-dialog.component';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { permissions } from '../permissions/permissions';
import { RoleService } from 'src/admin/services/role.service';
import { UpdateRoleDialogComponent } from '../dialogs/update-role-dialog/update-role-dialog/update-role-dialog.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {
  dataSource: MatTableDataSource<IFullProfileUserData>;
  displayedColumns: string[] = ['id', 'type', 'description', 'permissions', 'actions'];
  maxNrPermissions = permissions.length;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public rolesList: any[] = [];
  constructor(private roleService: RoleService, public dialog: MatDialog) {}

  async ngOnInit(): Promise<void> {
    await this.refreshDataSource();
  }

  async retrieveAllRoles() {
    return await this.roleService.retrieveAllRoles();
  }

  async refreshDataSource(): Promise<void> {
    this.rolesList = await this.retrieveAllRoles();
    this.dataSource = new MatTableDataSource(this.rolesList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async editRole(role) {
    const dialogRef = this.dialog.open(UpdateRoleDialogComponent, {
      width: '550px',
      disableClose: true,
      autoFocus: false,
      data: { roleId: role.id, type: role.type, permissions: role.permissions, description: role.description }
    });

    const editRoleData = await dialogRef.afterClosed().toPromise();
    if (editRoleData) {
      const response = await this.roleService.updateRole(editRoleData);
      await this.refreshDataSource();
      console.log('Edit role data:', response);
      // add banner
    } else {
      return;
    }
    return;
  }

  async deleteRole(roleType) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      disableClose: true,
      autoFocus: false,
      data: { title: 'Delete Role', buttonTextConfirm: 'Delete', buttonTextCancel: 'Cancel' }
    });
    const dialogSelection = await dialogRef.afterClosed().toPromise();
    if (dialogSelection) {
      let response = await this.roleService.deleteRoleByType(roleType);
      if (response == 204) {
        await this.refreshDataSource();
        // add banner - role has been deleted
      } else {
        // add banner
        console.log('Add a banner message');
      }
    } else {
      return;
    }
    return;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
