import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IRole } from 'src/admin/interfaces/role.interface';
import { permissions } from '../../permissions/permissions';
import { UpdateRoleDialogComponent } from '../update-role-dialog/update-role-dialog/update-role-dialog.component';

@Component({
  selector: 'app-create-role-dialog',
  templateUrl: './create-role-dialog.component.html',
  styleUrls: ['./create-role-dialog.component.css']
})
export class CreateRoleDialogComponent {
  public editRoleData: any;
  public permissionsList = permissions;
  public rolePermissions: { [key: string]: boolean } = {};

  constructor(public dialogRef: MatDialogRef<UpdateRoleDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.editRoleData = { ...data };
    this.initializePermissions();
  }

  initializePermissions() {
    // First, mark all permissions as false (unchecked)
    this.permissionsList.forEach(permission => {
      this.rolePermissions[permission] = false;
    });
  }

  onSave(): void {
    this.editRoleData.permissions = Object.keys(this.rolePermissions).filter(permission => this.rolePermissions[permission]);
    this.dialogRef.close(this.editRoleData);
  }
}
