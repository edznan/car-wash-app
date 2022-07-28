import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Discount } from 'src/app/shared/models/discount';
import { ApiService } from 'src/app/shared/services/api.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {

  discounts: Discount[] = [];

  weekendDiscountForm: FormGroup = new FormGroup({});
  every5thWashForm: FormGroup = new FormGroup({});

  isLoading = false;

  constructor(
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getDiscounts();
  }

  getDiscounts() {
    this.apiService.getDiscounts().subscribe((res: any) => {
      res.forEach((item: any) => {
        const discountObj: Discount = {
          id: item.id,
          label: item.label,
          discountAmount: item.discount_amount,
          isActive: item.is_active === 1 ? true : false
        };
        this.discounts.push(discountObj);
      });

      this.weekendDiscountForm = this.fb.group({
        id: '',
        isActiveWeekend: new FormControl('')
      });

      this.every5thWashForm = this.fb.group({
        id: '',
        isActiveEvery5th: new FormControl('')
      });

      this.weekendDiscountForm.patchValue({
        isActiveWeekend: this.discounts[0].isActive
      });

      this.every5thWashForm.patchValue({
        isActiveEvery5th: this.discounts[1].isActive
      });

      this.isLoading = false;
    });
  }

  valueChange(event: any, id: number, form: FormGroup, formControlName: string) {
    this.updateActivity(id, form.controls[formControlName].value  ? 1 : 0);
  }

  updateActivity(id: number, value: number) {
    this.apiService.updateDiscountActivity(id, value).subscribe((res: any) => {
      if (res.message === 'success') {
        this.snackbarService.openSnackBar('Discount updated successfully.');
        this.isLoading = true;
        this.discounts = [];
        this.getDiscounts();
      }
    });
  }

}
