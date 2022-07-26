import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-step-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class StepsDialogComponent implements OnInit {

  stepId: string = '';

  constructor(
    private dialogRef: MatDialogRef<StepsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private apiService: ApiService
    ) { }

  ngOnInit(): void {
    this.stepId = this.dialogData.id;
  }

  closeDialog(msg: string) {
    this.dialogRef.close(msg);
  }

  deleteStep() {
    this.apiService.deleteStep(+this.stepId).subscribe((res: any) => {
      if (res.message === 'success') {
        this.closeDialog('Yes');
      }
    });
  }
}
