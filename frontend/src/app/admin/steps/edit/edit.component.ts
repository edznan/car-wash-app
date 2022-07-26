import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Step } from 'src/app/shared/models/step';

@Component({
  selector: 'app-edit-step',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditStepComponent implements OnInit {

  editForm: FormGroup = new FormGroup({});
  isLoading = false;

  step: any = {};
  id = '';

  steps: any[] = [];

  constructor(
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
    ) {
      this.route.queryParams.subscribe(params => {
        this.id = params['id'];
      });
     }

  ngOnInit(): void {
    this.isLoading = true;
    this.getStepInfo(this.id);
  }

  getStepInfo(id: string) {
    this.apiService.getSingleStep(+id).subscribe((res: any) => {

      const stepObj: Step = {
        id: res[0].id,
        label: res[0].label,
        description: res[0].description,
      };

      this.isLoading = false;
      this.step = stepObj;

      this.editForm = this.fb.group({
        label: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required])
      });

      this.editForm.patchValue({
        label: this.step.label,
        description: this.step.description
      });
    });
  }

  submit(form: FormGroup) {
    if (form.valid) {
      const step: Step = {
        id: +this.id,
        label: form.controls['label'].value,
        description: form.controls['description'].value
      };
      this.apiService.updateStep(step).subscribe((res: any) => {
        if (res.message === 'success') {
          this.snackbarService.openSnackBar('Step updated successfully.');
          this.router.navigate(['admin/steps']);
        }
      });
    } else {
      if (form.controls['label'].hasError('required')) {
        this.snackbarService.openSnackBar('Label is required.');
        return;
      }
      if (form.controls['description'].hasError('required')) {
        this.snackbarService.openSnackBar('Description is required.');
        return;
      }
    }
  }

}
