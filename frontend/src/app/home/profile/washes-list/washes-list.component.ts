import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Wash } from 'src/app/shared/models/wash';

@Component({
  selector: 'app-washes-list',
  templateUrl: './washes-list.component.html',
  styleUrls: ['./washes-list.component.scss']
})
export class WashesListComponent implements OnInit {

  washes: Wash[] = [];

  displayedColumns = ['id', 'program', 'length', 'cost'];

  constructor(
    private dialogRef: MatDialogRef<WashesListComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
  ) { }

  ngOnInit(): void {
    if (this.dialogData.washes && this.dialogData.washes !== []) {
      this.dialogData.washes.forEach((wash: Wash) => {
        this.washes.push(wash);
      });
    }
  }

}
