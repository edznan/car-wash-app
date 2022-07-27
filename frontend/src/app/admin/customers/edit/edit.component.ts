import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { ApiService } from 'src/app/shared/services/api.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditCustomerComponent implements OnInit {

  user: any = {};
  id = '';
  isLoading = false;

  editForm: FormGroup = new FormGroup({});

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackbarService: SnackbarService
  ) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getUserInfo(this.id);

    this.editForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', [Validators.required]),
      moneySpent: new FormControl('', [Validators.required]),
      numberOfWashes: new FormControl('', [Validators.required]),
    });
  }

  getUserInfo(id: string) {
    this.apiService.getOneCustomer(+id).subscribe(res => {
      const userObj: User = {
        id: Object.values(res)[0].id,
        name: Object.values(res)[0].name,
        email: Object.values(res)[0].email,
        isAdmin: Object.values(res)[0].is_admin,
        numberOfWashes: Object.values(res)[0].number_of_washes,
        moneySpent: Object.values(res)[0].money_spent
      };

      this.user = userObj;
      this.isLoading = false;

      this.editForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        role: this.user.isAdmin ? 'admin' : 'customer',
        moneySpent: this.user.moneySpent,
        numberOfWashes: this.user.numberOfWashes
      });
    });
  }

  submit(form: FormGroup) {
    if (form.valid) {

      const customer = {
        id:  this.user.id,
        name: form.controls['name'].value,
        email: form.controls['email'].value,
        is_admin: form.controls['role'].value === 'Admin' ? true : false,
        number_of_washes: form.controls['numberOfWashes'].value,
        money_spent: form.controls['moneySpent'].value,
      }

      this.apiService.editCustomer(customer).subscribe((res: any) => {
        if (res.message === 'success') {
          this.snackbarService.openSnackBar('Editing successful.');
          this.router.navigate(['admin/customers']);
        }
      });
    } else {
      if (form.controls['name'].hasError('required')) {
        this.snackbarService.openSnackBar('Name is required.');
        return;
      }
      if (form.controls['email'].hasError('required')) {
        this.snackbarService.openSnackBar('Email is required.');
        return;
      } else if (form.controls['email'].hasError('email')) {
        this.snackbarService.openSnackBar('Email is invalid.');
        return;
      }
      if (form.controls['role'].hasError('required')) {
        this.snackbarService.openSnackBar('Role is required.');
        return;
      }
      if (form.controls['numberOfWashes'].hasError('required')) {
        this.snackbarService.openSnackBar('Number of washes is invalid.');
        return;
      }
      if (form.controls['moneySpent'].hasError('required')) {
        this.snackbarService.openSnackBar('Money spent is invalid.');
        return;
      }
    }
  }

}
