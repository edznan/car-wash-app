import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Option } from 'src/app/shared/models/moneyOption';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddPricingOptionComponent implements OnInit {

  addForm: FormGroup = new FormGroup({});

  constructor(
    private apiService: ApiService,
    private dialogRef: MatDialogRef<AddPricingOptionComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      time: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required])
    });
  }

  closeDialog(msg: string) {
    this.dialogRef.close(msg);
  }

  submit(form: FormGroup) {
    if (form.valid) {
      const timingOption: Option = {
        time: form.controls['time'].value,
        amount: form.controls['amount'].value,
      };

      this.apiService.createOption(timingOption).subscribe((res: any) => {
        if (res.message === 'success') {
          this.closeDialog('ok');
        }
      });
    }
  }

}
