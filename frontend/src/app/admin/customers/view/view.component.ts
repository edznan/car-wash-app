import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewCustomerComponent implements OnInit {

  user: any = {};
  id = '';
  isLoading = false;

  constructor(private apiService: ApiService, private router: Router) {
   this.id = this.router.url.substring(this.router.url.indexOf('view/') + 5);
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getUserInfo(this.id);
  }

  getUserInfo(id: string) {
    this.apiService.getOneCustomer(+id).subscribe(res => {
      const userObj: User = {
        id: Object.values(res)[0].id,
        name: Object.values(res)[0].name,
        email: Object.values(res)[0].email,
        isAdmin: Object.values(res)[0].is_admin,
        numberOfWashes: Object.values(res)[0].number_of_washes,
        moneySpent: Object.values(res)[0].money_spent,
        emailVerified: Object.values(res)[0].email_verified
      };
      this.user = userObj;
      this.isLoading = false;
    });
  }

  editUser(id: string) {
    this.router.navigate(['/admin/customers/edit'], {queryParams: {id: id}});
  }

}
