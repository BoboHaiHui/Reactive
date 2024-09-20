import { IFullProfileUserData } from 'src/admin/interfaces/admin.interfaces';
import { AdminService } from 'src/admin/services/admin.service';
import { ConfirmationDialogComponent } from 'src/shared/components/dialogs/confirmation-dialog/confirmation-dialog.component';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { UpdateUserDialogComponent } from '../dialogs/update-user-dialog/update-user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  dataSource: MatTableDataSource<IFullProfileUserData>;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'roleId', 'blocked', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public userList: IFullProfileUserData[] = [];
  constructor(private adminService: AdminService, public dialog: MatDialog) {}

  async ngOnInit(): Promise<void> {
    await this.refreshDataSource();
  }

  async retrieveAll() {
    return await this.adminService.retrieveAll();
  }

  async refreshDataSource(): Promise<void> {
    this.userList = await this.retrieveAll();
    this.dataSource = new MatTableDataSource(this.userList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async editUser(user) {
    const dialogRef = this.dialog.open(UpdateUserDialogComponent, {
      width: '550px',
      disableClose: true,
      autoFocus: false,
      data: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.roleId, blocked: user.blocked }
    });

    const editUserData = await dialogRef.afterClosed().toPromise();
    if (editUserData) {
      const response = await this.adminService.editUserData(editUserData);
      await this.refreshDataSource();
      console.log('Edit user data:', response);
      // add banner
    } else {
      return;
    }
  }

  async deleteUser(user) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      disableClose: true,
      autoFocus: false,
      data: { title: 'Delete User', buttonTextConfirm: 'Delete', buttonTextCancel: 'Cancel' }
    });
    const dialogSelection = await dialogRef.afterClosed().toPromise();
    if (dialogSelection) {
      let response = await this.adminService.deleteUser(user.id);
      if (response == 204) {
        await this.refreshDataSource();
        // add banner - user was deleted
      } else {
        // add banner
        console.log('Add a banner message');
      }
    } else {
      return;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
