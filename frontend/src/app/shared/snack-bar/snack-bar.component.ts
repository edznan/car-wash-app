import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {

  message = '';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

  ngOnInit(): void {
    this.message = this.data.message;
  }

}
