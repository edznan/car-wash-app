import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthFormData } from 'src/app/shared/models/authFromData';
import { Store } from '@ngrx/store';
import { registerPage } from 'src/app/store/actions/auth.actions';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';
import { Observable } from 'rxjs';
import { selectLoadingStatus, selectRegisteringStatus } from 'src/app/store/selectors/auth.selectors';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AppState } from 'src/app/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({});
  registering$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private store: Store<AppState>
  ) {
    this.registering$ = this.store.select(selectRegisteringStatus);
    this.isLoading$ = this.store.select(selectLoadingStatus);
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      const value: AuthFormData = {
        name: form.controls['name'].value,
        email: form.controls['email'].value,
        password: form.controls['password'].value
      };
      this.store.dispatch(registerPage({fromData: value}));
    } else {
      if (form.controls['email'].errors) {
        if (form.controls['email'].errors['required']) {
          this.snackbarService.openSnackBar('Email is required.');
          return;
        } else if (form.controls['email'].errors['email']) {
          this.snackbarService.openSnackBar('Please enter a correct email.');
          return;
        }
      }
      if (form.controls['password'].errors) {
        if (form.controls['password'].errors['required']) {
          this.snackbarService.openSnackBar('Password is required.');
          return;
        }
      }
      if (form.controls['name'].errors) {
        if (form.controls['name'].errors['required']) {
          this.snackbarService.openSnackBar('Name is required.');
          return;
        }
      }
    }
  }
}
