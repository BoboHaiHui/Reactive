import { AngularMaterialModule } from 'src/shared/angularMaterial.module';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserNavbarComponent } from './components/user-navbar/user-navbar.component';
import { UserService } from './services/user.service';
import { UserComponent } from './user.component';

@NgModule({
  imports: [AngularMaterialModule, HttpClientModule, CommonModule, RouterModule],
  exports: [],
  providers: [UserService],
  declarations: [UserComponent, UserNavbarComponent]
})
export class UserModule {}
