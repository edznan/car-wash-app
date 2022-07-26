import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Discount } from 'src/app/shared/models/discount';
import { Option } from 'src/app/shared/models/moneyOption';
import { PaymentProvider } from 'src/app/shared/models/paymentProvider';
import { Program } from 'src/app/shared/models/program';
import { Wash } from 'src/app/shared/models/wash';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthStateService } from 'src/app/shared/services/authState.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  firstForm: FormGroup = new FormGroup({});
  secondForm: FormGroup = new FormGroup({});
  thirdForm: FormGroup = new FormGroup({});

  programs: Program[]= [];
  providers: PaymentProvider[] = []
  moneyOptions: Option[] = [];
  discounts: Discount[] = [];

  programToShow: any = {};
  duration = 0;

  isWashing = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private authStateService: AuthStateService,
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService
    ) { }

  ngOnInit(): void {

    this.isLoading = true;

    this.getPrograms();
    this.getPricing();
    this.getProviders();
    this.getDiscounts();

    this.firstForm = this.fb.group({
      money: new FormControl('', [Validators.required])
    });

    this.secondForm = this.fb.group({
      paymentProvider: new FormControl('', [Validators.required])
    });

    this.thirdForm = this.fb.group({
      program: new FormControl('', [Validators.required]),
    });
  }

  getPrograms() {
    this.apiService.getAllPrograms().subscribe((res: any) => {
      res.forEach((item: any) => {
        const programObj: Program = {
          id: item.id,
          label: item.label,
          description: item.description,
          steps: item.steps
        };
        this.programs.push(programObj);
      });
    });
  }

  getDiscounts() {
    this.apiService.getActiveDiscounts().subscribe((res: any) => {
      res.forEach((item: any) => {
        const discountObj: Discount = {
          id: item.id,
          label: item.label,
          discountAmount: item.discount_amount,
          isActive: item.is_active === 1 ? true : false
        };
        this.discounts.push(discountObj);
      });
      this.isLoading = false;
    });
  }

  getProviders() {
    this.apiService.getAllProviders().subscribe((res: any) => {
      res.forEach((item: any) => {
        const providerObj: PaymentProvider = {
          id: item.id,
          name: item.name,
          logo: item.logo
        };
        this.providers.push(providerObj);
      });
    });
  }

  getPricing() {
    this.apiService.getAllOptions().subscribe((res: any) => {
      res.forEach((item: any) => {
        const option: Option = {
          id: item.id,
          time: item.time,
          amount: item.amount
        };
        this.moneyOptions.push(option);
      });
    });
  }

  startWash(firstForm: FormGroup, secondForm: FormGroup, thirdForm: FormGroup) {
    if (firstForm.valid && secondForm.valid && thirdForm.valid) {

      const wash: Wash = {
        cost: firstForm.controls['money'].value,
        paymentProvider: secondForm.controls['paymentProvider'].value,
        programId: thirdForm.controls['program'].value,
        userId: this.userService.userId,
      }

      const selectedDuration = this.moneyOptions.find(option => option.amount === +wash.cost);

      this.discounts.forEach(discount => {
        if (discount.isActive) {
          wash.cost = wash.cost - discount.discountAmount;
        }
      });

      this.apiService.getOneProgram(wash.programId).subscribe((val: any) => {
        this.programToShow = {
          id: val.program[0].id,
          label: val.program[0].label,
          description: val.program[0].description,
          steps: val.steps
        }

        wash.programName = this.programToShow.label;

        if (selectedDuration) {
          this.displayWash(this.programToShow, selectedDuration.time);
          wash.length = selectedDuration.time;

          this.apiService.createWash(wash).subscribe(res => {
            this.isLoading = true;
            firstForm.reset();
            secondForm.reset();
            thirdForm.reset();
          });
        }

      });
    }

  }

  prepareToWash() {
    this.isWashing = false;
    this.programToShow = null;
  }

  displayWash(program: Program, duration: number) {
    this.programToShow = program;
    this.duration = duration;
    this.isWashing = true;
  }

  logout() {
    this.authStateService.setAuthState(false);
    this.authStateService.setRoleState(false);
    this.tokenService.removeToken();
    this.userService.removeRole();
    this.router.navigate(['auth']);
  }

  profile() {
    this.router.navigate(['home/profile']);
  }

}
