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

  user!: User;
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
      this.user = data[0];
      this.isLoading = false;
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
      this.user.numberOfWashes = this.washes.length;
    });
  }

  viewListOfWashes() {
    this.dialog.open(WashesListComponent, {
      data: {
        washes: this.washes
      }
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
