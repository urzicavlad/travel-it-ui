import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  USER_FORM: FormGroup;
  submitted = false;
  success = false;
  private SUCCESS_SAVED: boolean;
  private ERROR_OCCURRED: boolean;

  constructor(private userDataService: UserService, private formBuilder: FormBuilder, private location: Location) {
    this.USER_FORM = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    if (this.USER_FORM.invalid) {
      return;
    }

    this.success = true;
  }

  goBack(): void {
    console.log('Go to home');
    this.location.back();
  }

  register() {
    const userToSaved: User = this.USER_FORM.getRawValue();
    this.userDataService.save(userToSaved)
      .subscribe(() => {
          this.SUCCESS_SAVED = true;
        },
        error => {
          console.log('Error in saving user: ', error);
          this.SUCCESS_SAVED = false;
          setTimeout(e => {
            // show error alert
            this.ERROR_OCCURRED = true;
          }, 2000);
          this.ERROR_OCCURRED = false;
        },
        () => {
          console.log('User was saved!');
          setTimeout(e => {
            this.SUCCESS_SAVED = false;
          }, 2000);
        });
    this.closeModal();
    this.goBack();
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

}
