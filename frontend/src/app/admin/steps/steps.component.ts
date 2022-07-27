import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Step } from 'src/app/shared/models/step';
import { ApiService } from 'src/app/shared/services/api.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { StepsDialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {

  steps: Step[] = [];
  isLoading = false;

  constructor(
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private router: Router,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getSteps();
  }

  getSteps() {
    this.steps = [];
    this.apiService.getAllSteps().subscribe((res: any) => {
      res.forEach((item: any) => {
        const stepObj: Step = {
          id: item.id,
          label: item.label,
          description: item.description
        };
        this.steps.push(stepObj);
      });
      this.isLoading = false;
    });
  }

  initAddStep() {
    this.router.navigate(['admin/steps/add']);
  }

  initEditStep(id?: number) {
    this.router.navigate(['/admin/steps/edit'], {queryParams: {id: id}});
  }

  initDeleteStep(id?: number) {
    this.dialog.open(StepsDialogComponent, {
      data: { id: id }
    }).afterClosed().subscribe(res => {
      if (res === 'Yes') {
        this.snackbarService.openSnackBar('Step deleted successfully.');
        this.isLoading = true;
        this.getSteps();
      }
    });
  }

}
