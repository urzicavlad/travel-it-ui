import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {AuthorizeDataService} from '../api/authorize-data.service';
import {CookieUtilsService} from '../common/cookie-utils-service';

@Component({
  selector: 'app-register',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LOGIN_FORM: FormGroup;
  submitted = false;
  success = false;
  private SUCCESS_LOG_IN: boolean;
  private ERROR_OCCURRED: boolean;

  constructor(private authorizeDataService: AuthorizeDataService, private cookieUtilsService: CookieUtilsService,
              private formBuilder: FormBuilder, private location: Location) {
    this.LOGIN_FORM = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    this.submitted = true;
    if (this.LOGIN_FORM.invalid) {
      return;
    }

    this.success = true;
  }

  goBack(): void {
    console.log('Go to home');
    this.location.back();
  }

  login() {
    const loginData: Login = this.LOGIN_FORM.getRawValue();
    this.authorizeDataService.login(loginData)
      .subscribe((user: User) => {
          this.SUCCESS_LOG_IN = true;
          this.cookieUtilsService.setCookie('user-logged', user.username, 1);
          console.log(`User was logged in! ${user}`);
          this.closeModal();
          this.goBack();
        },
        error => {
          console.log(`Error at login user: ${loginData.username}`, error);
          const alert = document.getElementById('login-alert');
          alert.innerText = error.error.message;
          alert.hidden = false;
          this.SUCCESS_LOG_IN = false;
          setTimeout(e => {
            // show error alert
            this.ERROR_OCCURRED = true;
          }, 2000);
          this.ERROR_OCCURRED = false;
        },
        () => {
          setTimeout(e => {
            this.SUCCESS_LOG_IN = false;
          }, 2000);
        });
  }


  openModal(): void {
    document.querySelector('.modal').classList.add('open');
  }

  closeModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add('close');
    setTimeout((m) => {
      m.classList.remove('open');
      m.classList.remove('close');
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
