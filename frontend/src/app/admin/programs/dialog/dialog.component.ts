import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-programs-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class ProgramsDialogComponent implements OnInit {

  programId: string = '';

  constructor(
    private dialogRef: MatDialogRef<ProgramsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private apiService: ApiService
    ) { }

  ngOnInit(): void {
    this.programId = this.dialogData.id;
  }

  closeDialog(msg: string) {
    this.dialogRef.close(msg);
  }

  deleteProgram() {
    this.apiService.deleteProgram(+this.programId).subscribe((res: any) => {
      if (res.message === 'success') {
        this.closeDialog('Yes');
      }
    });
  }

}
