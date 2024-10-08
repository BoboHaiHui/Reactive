import { ProfileService } from 'src/shared/services/profile.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-MFA',
  templateUrl: './MFA.component.html',
  styleUrls: ['./MFA.component.css']
})
export class MFAComponent implements OnInit {
  activateCodeForm: FormGroup;
  activateEmail: string | null;

  constructor(
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Initialize form using FormBuilder for a cleaner setup
    this.activateCodeForm = this.fb.group({
      activateCode: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[0-9]).{8,20}')]]
    });

    // Retrieve the email from the route parameter
    this.activateEmail = this.activatedRoute.snapshot.paramMap.get('email');
  }

  onSubmit() {
    if (this.activateCodeForm.valid && this.activateEmail) {
      const activateCode = this.activateCodeForm.get('activateCode')?.value;
      this.profileService
        .activate_account(this.activateEmail, activateCode) // Adjust method name for clarity
        .then(response => {
          console.log('Activation successful:', response);
          if (response) {
            // Show a success toaster message
            // Assuming a banner/toaster service is available in the app
            this.router.navigateByUrl('login');
          } else {
            // Show error message and navigate to error page
            this.router.navigateByUrl('error-page');
          }
        })
        .catch(error => {
          console.error('Error during activation:', error);
          // Show an error toaster message
        });
    } else {
      // If the form is invalid, mark all controls as touched to trigger validation messages
      this.activateCodeForm.markAllAsTouched();
    }
  }
}
