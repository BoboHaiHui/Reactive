import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatMenuModule],
  exports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatMenuModule],
  declarations: []
})
export class AngularMaterialModule {}
