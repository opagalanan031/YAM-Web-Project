import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  userConfirm = false;
  userId?: number;
  errorMessage = '';
  emailForm!: FormGroup;
  passwordForm!: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.emailForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
    });


    this.passwordForm = new FormGroup({
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'confirmPassword': new FormControl('', [Validators.required])
    });

    const forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  }

  confirmUserEmail() {
    this.errorMessage = '';

    if(!this.emailForm?.valid) {
      this.errorMessage = 'Please fill up required fields';
    } else {
      const email = this.emailForm.get('email')?.value;
      
      this.userService.getUserByEmail(email).subscribe({
        next: (data) => {
          this.userConfirm = true;
          this.userId = data?.id;
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = 'User with email: ' + email + ' not found';
        }
      })
    }
  }

  changePassword() {
    this.errorMessage = '';

    if(this.passwordForm.get('password')?.value !== this.passwordForm.get('confirmPassword')?.value) {
      this.errorMessage = 'Passwords do not match';
    } else if(!this.passwordForm?.valid) {
      this.errorMessage = 'Please fill up required fields';
    } else {
      const newPassword = this.passwordForm.get('password')?.value;
      
      this.userService.changePassword(newPassword, this.userId!).subscribe({
        error: (err) => {
          console.log(err);
          this.errorMessage = err.error.message;
        }
      })
    }
  }

  onClickOk() {
    this.router.navigate(['/login']);
  }

}
