import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/entities/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private userService: UserService) {
    this.signUpForm = this.createFormGroup();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.onSignUp()
  }

  get model() {
    return this.signUpForm.controls;
  }

  createFormGroup() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSignUp() {
    const newUser = new User()
    newUser.email = this.model.email.value
    newUser.displayName = this.model.username.value
    this.userService.signUpUser(newUser, this.model.password.value).then((result) => {
    }).catch((error) => {
      window.alert(error.message)
    })
  }

}
