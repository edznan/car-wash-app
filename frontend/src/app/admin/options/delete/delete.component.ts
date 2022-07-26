import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeletePricingOptionComponent implements OnInit {

  id: number = 0;

  constructor(
    private apiService: ApiService,
    private dialogRef: MatDialogRef<DeletePricingOptionComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
  ) { }

  ngOnInit(): void {
    this.id = this.dialogData.id;
  }

  closeDialog(message: string) {
    this.dialogRef.close(message);
  }

  deleteOption() {
    this.apiService.deleteOption(this.id).subscribe((res: any) => {
      this.closeDialog('ok');
    });
  }

}
