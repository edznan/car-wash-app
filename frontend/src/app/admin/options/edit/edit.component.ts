import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api.service';
import { Option } from 'src/app/shared/models/moneyOption';

@Component({
  selector: 'app-edit-billing',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditPricingOptionComponent implements OnInit {

  editForm: FormGroup = new FormGroup({});

  option: Option = {
    time: 0,
    amount: 0
  }

  constructor(
    private apiService: ApiService,
    private dialogRef: MatDialogRef<EditPricingOptionComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    ) {
      this.option = this.dialogData.option;
    }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      time: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
    });

    if (this.dialogData.option) {
      this.editForm.patchValue({
        time: this.option.time,
        amount: this.option.amount,
      });
    }
  }

  closeDialog(msg: string) {
    this.dialogRef.close(msg);
  }

  submit(form: FormGroup) {
    if (form.valid) {
      const optionObj = {
        id: this.option.id,
        time: form.controls['time'].value,
        amount: form.controls['amount'].value,
      };

      this.apiService.updateOption(optionObj).subscribe((res: any) => {
        if (res.message === 'success') {
          this.closeDialog('ok');
        }
      });
    }
  }

}
