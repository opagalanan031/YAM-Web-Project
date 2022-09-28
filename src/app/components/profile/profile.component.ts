import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Address, User } from 'src/app/models/models';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ 
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProfileComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProfileComponent),
      multi: true
    }
  ]
})
export class ProfileComponent implements OnInit {
  user!: User;
  userId!: number;
  editDetails = false;
  editAddress = false;
  errorMessage = '';

  detailsForm!: FormGroup;
  addressForm!: FormGroup;

  states: string[] = [ "AK","AL","AR","AS","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"];

  constructor(
    private tokenStorageService: TokenStorageService, 
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userId = this.tokenStorageService.getUser().id;

    this.userService.getUserById(this.userId).subscribe({
      next: (data) => {
        this.user = data;
      }, 
      error: (err) => {
        console.log(err);
      }
    })

    this.detailsForm = new FormGroup({
      'email': new FormControl(this.user.email, [Validators.required, Validators.email]),
      'username': new FormControl(this.user.username, [Validators.required, Validators.minLength(6)]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'confirmPassword': new FormControl('', [Validators.required]),
      'firstName': new FormControl(this.user.firstName, [Validators.required]),
      'lastName': new FormControl(this.user.lastName, [Validators.required]),
      'phone': new FormControl(this.user.phone, [Validators.required]),
    });

    this.addressForm = new FormGroup({
      'address': new FormControl('', [Validators.required]),
      'city': new FormControl('', [Validators.required]),
      'state': new FormControl('', [Validators.required])
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

  updateDetails() {
    if(this.detailsForm.get('password')?.value !== this.detailsForm.get('confirmPassword')?.value) {
      this.errorMessage = 'Passwords do not match';
    } else if(!this.detailsForm?.valid) {
      this.errorMessage = 'Please fill up required fields';
    } else {
      const updatedUser: User = {
        email: this.detailsForm.get('email')?.value,
        username: this.detailsForm.get('username')?.value,
        password: this.detailsForm.get('password')?.value,
        firstName: this.detailsForm.get('firstName')?.value,
        lastName: this.detailsForm.get('lastName')?.value,
        phone: this.detailsForm.get('phone')?.value,
        role: this.user.role,
        address: this.user.address
      };

      this.userService.updateDetails(updatedUser).subscribe({
        next: (data) => {
          window.alert('User Details updated successfully');
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = err.error.message;
        }
      })

    }
  }

  updateAddress() {
    if(!this.addressForm?.valid) {
      this.errorMessage = 'Please fill up required fields';
    } else {
      const updatedAddress: Address = {
          address: this.addressForm.get('address')?.value,
          city: this.addressForm.get('city')?.value,
          state: this.addressForm.get('state')?.value,
      };

      this.userService.updateAddress(updatedAddress, this.userId).subscribe({
        next: (data) => {
          window.alert('Address updated successfully');
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = err.error.message;
        }
      })
    }
  }
}
