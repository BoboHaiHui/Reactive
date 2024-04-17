import { AdminService } from 'src/admin/services/admin.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'roleId', 'blocked'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public userList;
  constructor(private adminService: AdminService) {}

  async ngOnInit(): Promise<void> {
    this.userList = await this.retrieveAll();
    console.log('UserList', this.userList);
    this.dataSource = new MatTableDataSource(this.userList);
    console.log('DataSource', this.dataSource);
  }

  async retrieveAll() {
    return await this.adminService.retrieveAll();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
