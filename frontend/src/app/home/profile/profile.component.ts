import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { Wash } from 'src/app/shared/models/wash';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthStateService } from 'src/app/shared/services/authState.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { UserService } from 'src/app/shared/services/user.service';
import { WashesListComponent } from './washes-list/washes-list.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User = {
    id: 0,
    name: '',
    moneySpent: 0,
    numberOfWashes: 0,
    email: '',
    isAdmin: false
  };

  washes: Wash[] = [];
  isLoading = false;

  constructor(
    private authStateService: AuthStateService,
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private dialog: MatDialog,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getUser();
  }

  getUser() {
    this.userService.getUserInfo().subscribe((data: any) => {
      this.user = {
        id: data[0].id,
        name: data[0].name,
        email: data[0].email,
        numberOfWashes: data[0].number_of_washes,
        moneySpent: data[0].money_spent,
        isAdmin: data[0].is_admin
      };
      this.getWashesForUser(this.user.id!);
    });
  }

  getWashesForUser(id: number) {
    this.apiService.getWashesForUser(id).subscribe((res: any) => {
      res.forEach((item: any) => {
        const washObj: Wash = {
          id: item.id,
          userId: id,
          cost: item.cost,
          length: item.length,
          programName: item.program_name,
          paymentProvider: item.payment_provider
        };
        this.washes.push(washObj);
      });
      this.isLoading = false;
    });
  }

  viewListOfWashes() {
    this.dialog.open(WashesListComponent, {
      data: {
        washes: this.washes
      },
      width: '360px'
    });
  }

  wash() {
    this.router.navigate(['home']);
  }

  logout() {
    this.authStateService.setAuthState(false);
    this.authStateService.setRoleState(false);
    this.tokenService.removeToken();
    this.userService.removeRole();
    this.router.navigate(['auth']);
  }

}
