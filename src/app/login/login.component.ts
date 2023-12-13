import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  username: string = '';
  password: string = '';

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const val = this.loginForm.value;

    if (val.username && val.password) {
      this.authService.login(val.username.toLowerCase(), val.password.toLowerCase())
        .subscribe(
          () => {
            console.log("User is logged in");
            this.router.navigateByUrl('/procedimentos');
          }
        );
    }
  }
}
