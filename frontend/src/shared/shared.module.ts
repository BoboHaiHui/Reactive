import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from './angularMaterial.module';
import { ConfirmationDialogComponent } from './components/dialogs/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  imports: [AngularMaterialModule, FormsModule],
  exports: [ConfirmationDialogComponent],
  declarations: [ConfirmationDialogComponent]
})
export class SharedModule {}
