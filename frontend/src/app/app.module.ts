import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// angular material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

// components
import { ProgramsComponent } from './admin/programs/programs.component';
import { DiscountsComponent } from './admin/discounts/discounts.component';
import { BillingComponent } from './admin/billing/billing.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CustomersComponent } from './admin/customers/customers.component';
import { StepsComponent } from './admin/steps/steps.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { WashComponent } from './home/wash/wash.component';
import { ProfileComponent } from './home/profile/profile.component';
import { NavigationComponent } from './admin/navigation/navigation.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StartComponent } from './home/start/start.component';
import { SnackBarComponent } from './shared/snack-bar/snack-bar.component';
import { EditStepComponent } from './admin/steps/edit/edit.component';
import { AddStepComponent } from './admin/steps/add/add.component';
import { EditCustomerComponent } from './admin/customers/edit/edit.component';
import { AddProgramComponent } from './admin/programs/add/add.component';
import { EditProgramComponent } from './admin/programs/edit/edit.component';
import { AddBillingComponent } from './admin/billing/add/add.component';
import { EditBillingComponent } from './admin/billing/edit/edit.component';
import { ProgramsDialogComponent } from './admin/programs/dialog/dialog.component';
import { ViewCustomerComponent } from './admin/customers/view/view.component';
import { OptionsComponent } from './admin/options/options.component';
import { StepsDialogComponent } from './admin/steps/dialog/dialog.component';
import { AddPricingOptionComponent } from './admin/options/add/add.component';
import { EditPricingOptionComponent } from './admin/options/edit/edit.component';
import { DeletePricingOptionComponent } from './admin/options/delete/delete.component';

// services
import { ApiService } from './shared/services/api.service';
import { AuthService } from './shared/services/auth.service';

// guards
import { AuthGuard } from './shared/guards/auth.guard';
import { SecureInnerPagesGuard } from './shared/guards/secure-inner-pages.guard';
import { AdminGuard } from './shared/guards/admin.guard';

// interceptors
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';

// environment
import { environment } from '../environments/environment';

//ngrx
import { reducers, metaReducers } from './store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as fromAuth from './store/reducers/auth.reducer';
import { AuthEffects } from './store/effects/auth.effects';
import { WashesListComponent } from './home/profile/washes-list/washes-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddBillingComponent,
    EditBillingComponent,
    EditCustomerComponent,
    ViewCustomerComponent,
    AddProgramComponent,
    ProgramsDialogComponent,
    EditProgramComponent,
    AddStepComponent,
    ProfileComponent,
    StepsDialogComponent,
    EditStepComponent,
    NavigationComponent,
    DashboardComponent,
    ProgramsComponent,
    DiscountsComponent,
    BillingComponent,
    CustomersComponent,
    StepsComponent,
    LoginComponent,
    RegisterComponent,
    WashComponent,
    NotFoundComponent,
    StartComponent,
    SnackBarComponent,
    LoginComponent,
    OptionsComponent,
    AddPricingOptionComponent,
    EditPricingOptionComponent,
    DeletePricingOptionComponent,
    WashesListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatButtonModule,
    DragDropModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatStepperModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatDialogModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatRippleModule,
    MatSnackBarModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true
    }),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [
    ApiService,
    AuthService,
    AuthGuard,
    SecureInnerPagesGuard,
    AdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
