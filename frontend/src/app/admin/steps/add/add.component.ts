import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Step } from 'src/app/shared/models/step';
import { ApiService } from 'src/app/shared/services/api.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-add-step',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddStepComponent implements OnInit {

  addForm: FormGroup = new FormGroup({});

  constructor(
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      label: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  submit(form: FormGroup) {
    if (form.valid) {
      const step: Step = {
        label: form.controls['label'].value,
        description: form.controls['description'].value
      };
      this.apiService.createStep(step).subscribe((res: any) => {
        if (res.message === 'success') {
          this.snackbarService.openSnackBar('Step created successfully.');
          this.router.navigate(['admin/steps']);
        }
      })
    } else {
      if (form.controls['label'].hasError('required')) {
        this.snackbarService.openSnackBar('Label is required.');
        return;
      }
      if (form.controls['description'].hasError('required')) {
        this.snackbarService.openSnackBar('Description is required.');
        return;
      }    }
  }

}
