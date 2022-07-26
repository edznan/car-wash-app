import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PaymentProvider } from 'src/app/shared/models/paymentProvider';
import { ApiService } from 'src/app/shared/services/api.service';
import * as _ from 'lodash';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-add-billing',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddBillingComponent implements OnInit {

  addForm: FormGroup = new FormGroup({});
  uploadedImageBase64: string = '';

  constructor(
    private apiService: ApiService,
    private dialogRef: MatDialogRef<AddBillingComponent>,
    private fb: FormBuilder,
    private snackbarService: SnackbarService
    ) { }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      logo: new FormControl('', [Validators.required]),
      imageString: ''
    });
  }

  closeDialog(msg: string) {
    this.dialogRef.close(msg);
  }

  submit(form: FormGroup) {
    if (form.valid) {
      const providerObj = {
        name: form.controls['name'].value,
        logo: form.controls['logo'].value,
        image_file: this.uploadedImageBase64
      };

      this.apiService.createProvider(providerObj).subscribe((res: any) => {
        if (res.message === 'success') {
          this.closeDialog('Ok');
        }
      });
    }
  }

  public handleImageUpload(fileToUpload: any) {
    if (fileToUpload.target.files && fileToUpload.target.files[0]) {
      const allowed_types = ['image/png', 'image/jpeg','image/jpg'];

      if (!_.includes(allowed_types, fileToUpload.target.files[0].type)) {
        let error = 'The allowed images are: ( JPEG | JPG | PNG )';
        this.snackbarService.openSnackBar(error);
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          this.uploadedImageBase64 = e.target.result;
        };
      };
      reader.readAsDataURL(fileToUpload.target.files[0]);
    }
    return;
  }

}
