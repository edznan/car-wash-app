import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import * as _ from 'lodash';
import { PaymentProvider } from 'src/app/shared/models/paymentProvider';

@Component({
  selector: 'app-edit-billing',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditBillingComponent implements OnInit {

  @ViewChild('imageUpload') imageUpload!: ElementRef;
  @ViewChild('selectedLogo') selectedLogo!: ElementRef;

  editForm: FormGroup = new FormGroup({});

  uploadedImageBase64: string = '';

  provider: PaymentProvider = {
    name: '',
    logo: ''
  }

  constructor(
    private apiService: ApiService,
    private dialogRef: MatDialogRef<EditBillingComponent>,
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    ) {
      this.provider = this.dialogData.provider;
    }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      logo: new FormControl('', [Validators.required]),
      imageString: ''
    });

    if (this.dialogData.provider) {
      this.editForm.patchValue({
        name: this.provider.name,
        logo: this.provider.logo,
      })
    }
  }


  closeDialog(msg: string) {
    this.dialogRef.close(msg);
  }

  submit(form: FormGroup) {
    if (form.valid) {
      const providerObj = {
        id: this.provider.id,
        name: form.controls['name'].value,
        logo: form.controls['logo'].value,
        image_file: this.uploadedImageBase64
      };

      this.apiService.updateProvider(providerObj).subscribe((res: any) => {
        if (res.message === 'success') {
          this.closeDialog('Ok');
        }
      });
    }
  }

  public handleImageUpload(fileToUpload: any) {

    this.selectedLogo.nativeElement.setAttribute('style', 'display: none !important');

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

  getImage(image: string) {
    let position = 16;
    let urlPart = ':8000';
    const path = [image.slice(0, position), urlPart, image.slice(position)].join('');
    return path;
  }

  initImageSelect() {
    this.imageUpload.nativeElement.setAttribute('type', 'file');
    this.imageUpload.nativeElement.click()
  }

}
