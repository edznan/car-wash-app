import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BillingComponent } from './admin/billing/billing.component';
import { AddBillingComponent } from './admin/billing/add/add.component';
import { EditBillingComponent } from './admin/billing/edit/edit.component';

import { CustomersComponent } from './admin/customers/customers.component';
import { EditCustomerComponent } from './admin/customers/edit/edit.component';
import { ViewCustomerComponent } from './admin/customers/view/view.component';

import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { DiscountsComponent } from './admin/discounts/discounts.component';

import { ProgramsComponent } from './admin/programs/programs.component';
import { AddProgramComponent } from './admin/programs/add/add.component';
import { EditProgramComponent } from './admin/programs/edit/edit.component';

import { StepsComponent } from './admin/steps/steps.component';
import { AddStepComponent } from './admin/steps/add/add.component';
import { EditStepComponent } from './admin/steps/edit/edit.component';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './home/profile/profile.component';
import { StartComponent } from './home/start/start.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { AuthGuard } from './shared/guards/auth.guard';
import { SecureInnerPagesGuard } from './shared/guards/secure-inner-pages.guard';
import { OptionsComponent } from './admin/options/options.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'wash',
        pathMatch: 'full'
      },
      {
        path: 'wash',
        component: StartComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'customers',
        component: CustomersComponent
      },
      {
        path: 'customers/edit',
        component: EditCustomerComponent
      },
      {
        path: 'customers/view/:id',
        component: ViewCustomerComponent
      },
      {
        path: 'programs',
        component: ProgramsComponent
      },
      {
        path: 'programs/add',
        component: AddProgramComponent
      },
      {
        path: 'programs/edit',
        component: EditProgramComponent
      },
      {
        path: 'steps',
        component: StepsComponent
      },
      {
        path: 'steps/add',
        component: AddStepComponent
      },
      {
        path: 'steps/edit',
        component: EditStepComponent
      },
      {
        path: 'billing',
        component: BillingComponent
      },
      {
        path: 'billing/add',
        component: AddBillingComponent
      },
      {
        path: 'billing/edit',
        component: EditBillingComponent
      },
      {
        path: 'discounts',
        component: DiscountsComponent
      },
      {
        path: 'options',
        component: OptionsComponent
      }
    ]
  },
  {
    path: 'auth',
    canActivate: [SecureInnerPagesGuard],
    children: [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
