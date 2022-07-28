import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Program } from 'src/app/shared/models/program';
import { ApiService } from 'src/app/shared/services/api.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-add-program',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddProgramComponent implements OnInit {

  addForm: FormGroup = new FormGroup({});
  isLoading = false;

  steps: any[] = [];

  constructor(
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private router: Router,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {

    this.isLoading = true;

    this.getSteps();

    this.addForm = this.fb.group({
      label: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      steps: new FormControl('', [Validators.required])
    });

    this.addForm.controls['steps'].valueChanges.subscribe(res => {
      if (res.length >= this.steps.length) {
        this.steps = [...res];
      }
    })
  }

  getSteps() {
    this.apiService.getAvailableSteps().subscribe((res: any) => {
      if (res === {}) {
        this.steps = [];
      } else {
        this.steps = res;
      }
      this.isLoading = false;
    });
  }

  submit(form: FormGroup) {
    if (form.valid) {
      const program: Program = {
        label: form.controls['label'].value,
        description: form.controls['description'].value,
        steps: form.controls['steps'].value,
      };
      this.apiService.createProgram(program).subscribe((res: any) => {
        if (res.message === 'success') {
          this.snackbarService.openSnackBar('Program added successfully.');
          this.router.navigate(['admin/programs']);
        }
      });
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.steps, event.previousIndex, event.currentIndex);
    let index = 0;
    this.steps.forEach(step => {
      index++;
      step.id = index;
    });
    this.steps = [...this.steps];
  }

}
