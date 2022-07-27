import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  programs: Program[] = [];
  providers: PaymentProvider[] = []
  moneyOptions: Option[] = [];

  programToShow: any = {};
  duration = 0;

  isWashing = false;
  isLoadingSpinner = false;
  isLoadingBar = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private authStateService: AuthStateService,
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {

    this.isLoadingSpinner = true;

    this.getPrograms();
    this.getPricing();
    this.getProviders();

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
    this.isLoadingSpinner = false;
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

      this.isLoadingBar = true;

      const wash: Wash = {
        cost: firstForm.controls['money'].value,
        paymentProvider: secondForm.controls['paymentProvider'].value,
        programId: thirdForm.controls['program'].value,
        userId: this.userService.userId,
      }

      let selectedOptionObj: Option = {
        time: 0,
        amount: 0
      };

      this.moneyOptions.forEach(option => {
        if (option.amount === +wash.cost) {
          selectedOptionObj = option;
        }
      });

      wash.length = selectedOptionObj.time;

      this.apiService.getOneProgram(wash.programId).subscribe((val: any) => {

        this.programToShow = {
          id: val.program[0].id,
          label: val.program[0].label,
          description: val.program[0].description,
          steps: val.steps
        }

        wash.programName = this.programToShow.label;

        this.apiService.createWash(wash).subscribe((res: any) => {

          if (res.message === 'success') {
            this.displayWash(this.programToShow, selectedOptionObj.time);
            firstForm.reset();
            secondForm.reset();
            thirdForm.reset();
            this.isLoadingBar = false;
          }
        });
      });
    }

  }

  prepareToWash() {
    this.firstForm.reset();
    this.secondForm.reset();
    this.thirdForm.reset();
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
