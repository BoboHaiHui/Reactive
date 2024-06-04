import { ProfileService } from 'src/shared/services/profile.service';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {
  activateCodeForm: FormGroup;
  activateEmail: string;

  constructor(private profileService: ProfileService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.activateCodeForm = new FormGroup({
      activateCode: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[0-9]).{8,20}')])
    });

    this.activateEmail = this.activatedRoute.snapshot.paramMap.get('email');
  }

  onSubmit() {
    if (this.activateCodeForm.valid) {
      const activateCode = this.activateCodeForm.get('activateCode').value;
      this.profileService
        .activate_account(this.activateEmail, activateCode)
        .then(response => {
          console.log('ok', response);
          if (response) {
            //toaster message here: Account has been activate. Please Login
            this.router.navigateByUrl('login');
          } else {
            this.router.navigateByUrl('error-page');
          }
        })
        .catch(error => {
          console.log('error', error);
          //toaster message here
        });
    }
  }
}
