import { Component, OnInit, Provider } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PaymentProvider } from 'src/app/shared/models/paymentProvider';
import { ApiService } from 'src/app/shared/services/api.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AddBillingComponent } from './add/add.component';
import { EditBillingComponent } from './edit/edit.component';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  billingOptions: PaymentProvider[] = [];
  isLoading = false;

  constructor(
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getProviders()
  }

  getProviders() {
    this.apiService.getAllProviders().subscribe((res: any) => {
      res.forEach((item: any) => {
        const providerObj: PaymentProvider = {
          id: item.id,
          name: item.name,
          logo: item.logo
        };
        this.billingOptions.push(providerObj);
      });
      this.isLoading = false;
    });
  }

  initDeleteProvider(id?: any) {
    this.apiService.deleteProvider(+id).subscribe((res: any) => {
      if (res.message === 'success') {
        this.snackbarService.openSnackBar('Billing option deleted.');
        this.isLoading = true;
        this.billingOptions = [];
        this.getProviders();
      }
    });
  }

  initEditProvider(provider: PaymentProvider) {
    this.dialog.open(EditBillingComponent, {
      data: {
        provider
      }
    }).afterClosed().subscribe(res => {
      if (res === 'Ok') {
        this.snackbarService.openSnackBar('Billing option updated.');
        this.isLoading = true;
        this.billingOptions = [];
        this.getProviders();
      }
    });
  }

  initAddProvider() {
    this.dialog.open(AddBillingComponent).afterClosed().subscribe(res => {
      if (res === 'Ok') {
        this.snackbarService.openSnackBar('Billing option added.');
        this.isLoading = true;
        this.billingOptions = [];
        this.getProviders();
      }
    });
  }

  getImage(image: string) {
    let position = 16;
    let urlPart = ':8000';
    const path = [image.slice(0, position), urlPart, image.slice(position)].join('');
    return path;
  }

}
