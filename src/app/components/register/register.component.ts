import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {UserService} from '../../services/user.service';
import {MustMatch} from '../../services/MustMatch';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  successValidated = false;
  private successSaved: boolean;
  loading: boolean;
  serverErrorOccurred: boolean;
  serverErrorMessage: string;

  private readonly passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';

  usernameExists: boolean;
  validationFocus: boolean;
  message: string;
  errors: ValidationErrors;

  constructor(private userDataService: UserService, private formBuilder: FormBuilder, private location: Location) {
    this.registerForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
        firstName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
        lastName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100),
          Validators.pattern(this.passwordPattern)
        ]],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: MustMatch('password', 'confirmPassword')
      });
  }


  ngOnInit() {
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  validateForm() {
    console.log('Form was submitted, verifying the form fields...');
    this.submitted = true;
    this.successValidated = !this.registerForm.invalid;
  }

  goBack(): void {
    console.log('Go to home');
    this.location.back();
  }

  onSubmit() {
    this.validateForm();
    if (!this.successValidated) {
      console.log('Invalid form data passed by the user!');
    } else {
      console.log('Form is valid proceeding with register!');
      this.register();
    }
  }

  register() {
    console.log('Register');
    this.loading = true;
    const userToBeSaved: User = this.registerForm.getRawValue();
    this.userDataService.save(userToBeSaved)
      .subscribe(() => {
          this.successSaved = true;
        },
        error => {
          console.log('Error in saving user: ', error);
          this.serverErrorOccurred = true;
          this.successSaved = false;
          this.loading = false;
          this.serverErrorMessage = error.error.message;
        },
        () => {
          this.successSaved = true;
          console.log('User was registered!');
          this.loading = false;
          this.closeModal();
          this.goBack();
        });
  }

  openModal(): void {
    document.querySelector('.modal').classList.add('open');
  }

  closeModal() {
    document.querySelector('.modal').classList.add('close');
    setTimeout((modal) => {
      modal.classList.remove('open');
      modal.classList.remove('close');
    }, 1500);
  }

  animeInput(event) {
    event.target.closest('.input-wrapper').classList.add('active');
  }

  removeAnimeInput(event) {
    if (event.target.value === '') {
      event.target.closest('.input-wrapper').classList.remove('active');
    }
  }

  getFeedbackField(fieldName: string) {
    return {
      'is-invalid': this.f[fieldName].errors,
      'is-valid': !this.f[fieldName].errors
    };
  }

  getFieldErrors(fieldName: string) {
    const errors = this.registerForm.get(fieldName).errors;
    if (errors != null) {
      Object.keys(errors).forEach(keyError => {
        console.log('Key control: ' + fieldName + ', keyError: ' + keyError + ', err value: ', errors[keyError]);
      });
    }
    return errors;
  }

  showValidation(fieldName: string) {
    this.validationFocus = true;
    this.errors = this.getFieldErrors(fieldName);
    if (this.errors == null) {
      this.validationFocus = false;
      this.message = null;
      return;
    }
    if (this.errors.required) {
      this.message = `${fieldName} is required!`;
    }
    if (this.errors.minlength) {
      this.message = `${fieldName} must have at least ${this.errors.minlength.requiredLength} characters!`;
    }
    if (this.errors.maxlength) {
      this.message = `${fieldName} must have max ${this.errors.maxlength.requiredLength} characters`;
    }
    if (this.errors.mustMatch) {
      this.message = `${fieldName} must match!`;
    }
    if (this.errors.email) {
      this.message = `${fieldName} must be valid!`;
    }
    if (this.errors.pattern) {
      this.message = `Minimum eight characters, at least one uppercase letter, one lowercase letter and one number, one special character`;
    }

  }

  callForUser(username: string) {
    console.log(`Checking username: ${username} in database!`);
    this.userDataService.userExists(username)
      .subscribe(() => {
          console.log(`User with username: ${username} exists in the database!`);
          this.usernameExists = true;
        },
        error => {
          console.log(`User with username: ${username} is not in the database!`);
          this.usernameExists = false;
        },
        () => {
          this.loading = false;
        });
  }

}
