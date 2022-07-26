import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Program } from 'src/app/shared/models/program';
import { ApiService } from 'src/app/shared/services/api.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ProgramsDialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {

  programs: Program[] = [];
  isLoading = false;

  constructor(
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private router: Router,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getPrograms();
  }

  getPrograms() {
    this.apiService.getAllPrograms().subscribe((res: any) => {
      res.forEach((item: any) => {
        const programObj: Program = {
          id: item.id,
          label: item.label,
          description: item.description,
          steps: item.steps
        };
        this.programs.push(programObj);
      });
      this.isLoading = false;
    });
  }

  initAddProgram() {
    this.router.navigate(['admin/programs/add']);
  }

  initEditProgram(id?: number) {
    this.router.navigate(['/admin/programs/edit'], {queryParams: {id: id}});
  }

  initDeleteProgram(id?: number) {
    this.dialog.open(ProgramsDialogComponent, {
      data: { id: id }
    }).afterClosed().subscribe(res => {
      if (res === 'Yes') {
        this.snackbarService.openSnackBar('Program deleted successfully.');
        this.isLoading = true;
        this.programs = [];
        this.getPrograms();
      }
    });
  }

}
