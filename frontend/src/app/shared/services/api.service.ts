import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Option } from '../models/moneyOption';
import { PaymentProvider } from '../models/paymentProvider';
import { Program } from '../models/program';
import { Step } from '../models/step';
import { User } from '../models/user';
import { Wash } from '../models/wash';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // WASHES

  createWash(wash: Wash) {
    return this.http.post(environment.api + '/washes/add', wash);
  }

  updateWash(id: number, wash: Wash) {
    return this.http.put(environment.api + '/washes/edit/' + id, wash);
  }

  getAllWashes() {
    return this.http.get(environment.api + '/washes/all');
  }

  getWashesForUser(userId: number) {
    return this.http.get(environment.api + '/washes/user/' + userId);
  }

  deleteWash(id: number) {
    return this.http.post(environment.api + '/washes/delete/', id);
  }

  // TIMING - MONEY OPTIONS

  createOption(option: Option) {
    return this.http.post(environment.api + '/timing-options/add', option);
  }

  updateOption(option: Option) {
    return this.http.put(environment.api + '/timing-options/edit/' + option.id, option);
  }

  getAllOptions() {
    return this.http.get(environment.api + '/timing-options/all');
  }

  deleteOption(id: number) {
    return this.http.get(environment.api + '/timing-options/delete/' + id);
  }

  // CUSTOMERS

  getAllCustomers() {
    return this.http.get(environment.api + '/users/all');
  }

  getOneCustomer(id: number) {
    return this.http.get(environment.api + '/users/single/' + id);
  }

  addCustomer(customer: User) {
    return this.http.post(environment.api + '/users/add', customer);
  }

  editCustomer(customer: any) {
    return this.http.put(environment.api + '/users/edit/' + customer.id, customer);
  }

  deleteCustomer(id: string) {
    return this.http.get(environment.api + '/users/delete/' + id);
  }

  // PROGRAMS

  createProgram(program: Program) {
    return this.http.post(environment.api + '/programs/add', program);
  }

  updateProgram(program: Program) {
    return this.http.put(environment.api + '/programs/edit/' + program.id, program);
  }

  getAllPrograms() {
    return this.http.get(environment.api + '/programs/all');
  }

  getOneProgram(id?: number) {
    return this.http.get(environment.api + '/programs/single/' + id);
  }

  deleteProgram(id: number) {
    return this.http.get(environment.api + '/programs/delete/' + id);
  }

  // STEPS

  createStep(step: Step) {
    return this.http.post(environment.api + '/steps/add', step);
  }

  updateStep(step: Step) {
    return this.http.put(environment.api + '/steps/edit/' + step.id, step);
  }

  getAllSteps() {
    return this.http.get(environment.api + '/steps/all');
  }

  getAvailableSteps() {
    return this.http.get(environment.api + '/steps/available');
  }

  getSingleStep(id: number) {
    return this.http.get(environment.api + '/steps/single/' + id);
  }

  getStepsForProgram(programId: number) {
    return this.http.get(environment.api + '/steps/program/' + programId);
  }

  deleteStep(id: number) {
    return this.http.get(environment.api + '/steps/delete/' + id);
  }

  // PAYMENT PROVIDERS

  createProvider(provider: PaymentProvider) {
    return this.http.post(environment.api + '/payment-providers/add', provider);
  }

  updateProvider(provider: PaymentProvider) {
    return this.http.put(environment.api + '/payment-providers/edit/' + provider.id, provider);
  }

  getAllProviders() {
    return this.http.get(environment.api + '/payment-providers/all');
  }

  getSingleProvider(id: number) {
    return this.http.get(environment.api + '/payment-providers/single/' + id);
  }

  deleteProvider(id: number) {
    return this.http.get(environment.api + '/payment-providers/delete/' + id);
  }

  // DISCOUNTS

  getDiscounts() {
    return this.http.get(environment.api + '/discounts/all');
  }

  getActiveDiscounts() {
    return this.http.get(environment.api + '/discounts/active');
  }

  updateDiscountActivity(id: number, value: number) {
    return this.http.put(environment.api + '/discounts/edit/' + id, value);
  }

  // DASHBOARD

  getDashboardInfo() {
    return this.http.get(environment.api + '/dashboard');
  }
}
