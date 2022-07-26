import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Program } from 'src/app/shared/models/program';
import { ApiService } from 'src/app/shared/services/api.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Step } from 'src/app/shared/models/step';

@Component({
  selector: 'app-edit-program',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditProgramComponent implements OnInit {

  editForm: FormGroup = new FormGroup({});
  isLoading = false;

  program: any = {};
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
    this.getProgramInfo(this.id);
  }

  getProgramInfo(id: string) {
    this.apiService.getOneProgram(+id).subscribe((res: any) => {

      const programObj: Program = {
        id: res.program[0].id,
        label: res.program[0].label,
        description: res.program[0].description,
        steps: res.steps
      };

      this.isLoading = false;
      this.program = programObj;

      if (this.program.steps.length === 0) {
        this.apiService.getAllSteps().subscribe((res: any) => {
          this.steps = [...res];
          this.program.steps = [...res];
        });
      }

      this.editForm = this.fb.group({
        label: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        steps: [this.program.steps, [Validators.required]],
      });

      this.editForm.patchValue({
        label: this.program.label,
        description: this.program.description,
        steps: this.program.steps
      });

      this.editForm.controls['steps'].setValue(this.program.steps);

      this.program.steps.forEach((step: any) => {
        const stepObj: Step = {
          id: step.id,
          label: step.label,
          description: step.description
        };
        this.steps.push(stepObj);
      });

      this.editForm.controls['steps'].valueChanges.subscribe(res => {
        this.steps = [...res];
      })
    });
  }

  submit(form: FormGroup) {
    if (form.valid) {
      const program: Program = {
        id: +this.id,
        label: form.controls['label'].value,
        description: form.controls['description'].value,
        steps: this.steps
      };
      this.apiService.updateProgram(program).subscribe((res: any) => {
        if (res.message === 'success') {
          this.snackbarService.openSnackBar('Program updated successfully.');
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
    this.program.steps = [...this.steps];
  }

}
