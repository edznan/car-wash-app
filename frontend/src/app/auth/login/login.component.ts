import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { AuthFormData } from 'src/app/shared/models/authFromData';
import { select, Store } from '@ngrx/store';
import { loginPage } from 'src/app/store/actions/auth.actions';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { selectLoginLoadingStatus } from 'src/app/store/selectors/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  isLoading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private store: Store<AppState>
    ) {
      this.isLoading$ = this.store.pipe(select(selectLoginLoadingStatus));
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit(form: FormGroup) {
     if (form.valid) {
      const value: AuthFormData = {
        email: form.controls['email'].value,
        password: form.controls['password'].value
      }
      this.store.dispatch(loginPage({fromData: value}));
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
    }
  }

}
