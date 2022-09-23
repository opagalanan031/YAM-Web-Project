import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  states: string[] = [ "AK","AL","AR","AS","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"];
  roles: string[] = ["Regular", "Core"];

  registerForm!: FormGroup;
  errorMessage = '';
  changePassword = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'username': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'confirmPassword': new FormControl('', [Validators.required, this.passwordMatchValidator.bind(this)]),
      'firstName': new FormControl('', [Validators.required]),
      'lastName': new FormControl('', [Validators.required]),
      'phone': new FormControl(),
      'role': new FormControl('', [Validators.required]),
      'address': new FormControl(),
      'city': new FormControl(),
      'state': new FormControl()
    });
  }

  register() {
    const user: User = {
      email: this.registerForm.get('email')?.value,
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      phone: this.registerForm.get('phone')?.value,
      role: this.registerForm.get('role')?.value,
      address: {
        address: this.registerForm.get('address')?.value,
        city: this.registerForm.get('city')?.value,
        state: this.registerForm.get('state')?.value,
      },
    };

    this.userService.register(user).subscribe({
      next: (data) => {
        window.alert('Registration Successful!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  passwordMatchValidator(control: FormControl):{[s: string] : boolean} {
    if(control.parent?.value.password !== control.value) {
      return {'notmatched' : true};
    }

    return null as any;
  }

}
