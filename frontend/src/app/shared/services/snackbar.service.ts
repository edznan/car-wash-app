import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(msg?: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 2 * 1000,
      data: {
        message: msg
      },
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}
