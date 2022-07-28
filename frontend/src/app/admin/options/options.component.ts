import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Option } from 'src/app/shared/models/moneyOption';
import { ApiService } from 'src/app/shared/services/api.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AddPricingOptionComponent } from './add/add.component';
import { DeletePricingOptionComponent } from './delete/delete.component';
import { EditPricingOptionComponent } from './edit/edit.component';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  moneyOptions: Option[] = [];
  isLoading = false;

  constructor(
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getOptions()
  }

  getOptions() {
    this.apiService.getAllOptions().subscribe((res: any) => {
      res.forEach((item: any) => {
        const optionObj: Option = {
          id: item.id,
          time: item.time,
          amount: item.amount
        };
        this.moneyOptions.push(optionObj);
      });
      this.isLoading = false;
    })
  }

  initEditOption(option: Option) {
    this.dialog.open(EditPricingOptionComponent, {
      data: { option }
    }).afterClosed().subscribe(res => {
      if (res === 'ok') {
        this.snackbarService.openSnackBar('Pricing option updated.');
        this.isLoading = true;
        this.moneyOptions = [];
        this.getOptions();
      }
    });
  }

  initDeleteOption(id?: number) {
    this.dialog.open(DeletePricingOptionComponent, {
      data: { id: id },
      width: '300px'
    }).afterClosed().subscribe(res => {
      if (res === 'ok') {
        this.snackbarService.openSnackBar('Pricing option deleted.');
        this.isLoading = true;
        this.moneyOptions = [];
        this.getOptions();
      }
    });
  }

  initAddOption() {
    this.dialog.open(AddPricingOptionComponent).afterClosed().subscribe(res => {
      if (res === 'ok') {
        this.snackbarService.openSnackBar('Added new pricing option.');
        this.isLoading = true;
        this.moneyOptions = [];
        this.getOptions();
      }
    });
  }
}
