import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserService, AlertService } from '../_services';
import { UserRequest, User } from '../_models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    let userRequest: UserRequest = this.createUserRequest();
    this.userService.register(userRequest).subscribe((resp) => {
      this.alertService.success('Operação realizada com sucesso.', true);
      this.router.navigate(["/login"]);
    }, error => {
      this.alertService.error(error);
      this.loading = false;
    });
  }

  createUserRequest(): UserRequest {
    let result: UserRequest = new UserRequest();
    result.name = this.f.name.value;
    result.username = this.f.username.value;
    result.email = this.f.email.value;
    result.password = this.f.password.value;
    return result;
  }
}