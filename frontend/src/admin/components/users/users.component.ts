import { IFullProfileUserData } from 'src/admin/interfaces/admin.interfaces';
import { AdminService } from 'src/admin/services/admin.service';

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<IFullProfileUserData>;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'roleId', 'blocked'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public userList: IFullProfileUserData[] = [];
  constructor(private adminService: AdminService) {}

  async ngOnInit(): Promise<void> {
    this.userList = await this.retrieveAll();
    this.dataSource = new MatTableDataSource(this.userList);
    console.log(this.dataSource);
  }

  async ngAfterViewInit() {
    await this.ngOnInit();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log('NgAfter', this.dataSource);
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
