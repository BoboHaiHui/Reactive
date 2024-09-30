import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent {
  constructor(private snackBar: MatSnackBar) {}

  showBannerMessage() {
    this.snackBar.open('This is a banner message', 'Close', {
      duration: 5000, // auto close after 5 seconds
      verticalPosition: 'top', // position it at the top like a banner
      horizontalPosition: 'center'
    });
  }
}
