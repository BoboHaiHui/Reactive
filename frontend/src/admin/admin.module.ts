import { AngularMaterialModule } from 'src/shared/angularMaterial.module';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminRoutes } from './admin-routing';
import { AdminComponent } from './admin.component';

@NgModule({
  imports: [HttpClientModule, CommonModule, AngularMaterialModule, RouterModule.forChild(AdminRoutes)],
  exports: [],
  declarations: [AdminComponent]
})
export class AdminModule {}
