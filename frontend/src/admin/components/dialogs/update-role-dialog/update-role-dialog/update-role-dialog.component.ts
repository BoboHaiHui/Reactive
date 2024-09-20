import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { permissions } from 'src/admin/components/permissions/permissions';

@Component({
  selector: 'app-update-role-dialog',
  templateUrl: './update-role-dialog.component.html',
  styleUrls: ['./update-role-dialog.component.css']
})
export class UpdateRoleDialogComponent {
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

    // Then, check the current role's permissions and mark them as true
    if (this.editRoleData.permissions) {
      this.editRoleData.permissions.forEach(permission => {
        if (this.rolePermissions.hasOwnProperty(permission)) {
          this.rolePermissions[permission] = true; // Mark as checked if the permission is found
        }
      });
    }
  }

  onSave(): void {
    this.editRoleData.permissions = Object.keys(this.rolePermissions).filter(permission => this.rolePermissions[permission]);
    this.dialogRef.close(this.editRoleData);
  }
}
