import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from './angularMaterial.module';
import { ConfirmationDialogComponent } from './components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { BannerComponent } from './components/banner/banner.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [AngularMaterialModule, FormsModule, CommonModule],
  exports: [ConfirmationDialogComponent, BannerComponent, SnackBarComponent],
  declarations: [ConfirmationDialogComponent, BannerComponent, SnackBarComponent]
})
export class SharedModule {}
