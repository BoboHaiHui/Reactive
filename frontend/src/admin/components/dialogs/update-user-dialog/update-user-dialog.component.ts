import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.css']
})
export class UpdateUserDialogComponent {
  constructor(public dialogRef: MatDialogRef<UpdateUserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onSave(): void {
    this.dialogRef.close();
  }
}
