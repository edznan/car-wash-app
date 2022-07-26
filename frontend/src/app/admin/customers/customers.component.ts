import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { ApiService } from 'src/app/shared/services/api.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  users: User[] = [];
  isLoading = false;

  displayedColumns: string[] = ['name', 'email', 'visits', 'view', 'delete'];

  constructor(private apiService: ApiService, private router: Router, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getUsers();
  }

  getUsers() {
    this.apiService.getAllCustomers().subscribe((res: any) => {
      res.forEach((item: any) => {
        const object: User = {
          id: item.id,
          name: item.name,
          email: item.email,
          numberOfWashes: item.number_of_washes,
          moneySpent: item.money_spent,
          emailVerified: item.email_verified,
          isAdmin: item.is_admin
        }
        this.users.push(object);
      });
      this.isLoading = false;
    });
  }

  viewCustomer(userId: string) {
    this.router.navigateByUrl('/admin/customers/view/' + userId);
  }

  deleteCustomer(userId: string) {
    this.apiService.deleteCustomer(userId).subscribe((res: any) => {
        if (res.message === 'success') {
          const userIndex = this.users.findIndex(user => {
            return user.id === +userId;
          });

          this.users.splice(userIndex);
          this.users = [...this.users];
          this.snackbarService.openSnackBar('User deleted successfully');
        }
    });
  }

}
