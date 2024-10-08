import { AdminModule } from 'src/admin/admin.module';
import { ContactComponent } from 'src/general-pages/contact/contact.component';
import { ErrorPageComponent } from 'src/general-pages/error-page/error-page.component';
import { HomeComponent } from 'src/general-pages/home/home.component';
import { LoginComponent } from 'src/general-pages/login/login.component';
import { RegisterComponent } from 'src/general-pages/register/register.component';
import { AngularMaterialModule } from 'src/shared/angularMaterial.module';
import { FooterComponent } from 'src/shared/components/footer/footer.component';
import { HomeNavbarComponent } from 'src/shared/components/home-navbar/home-navbar.component';
import { ProfileService } from 'src/shared/services/profile.service';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { ActivateAccountComponent } from '../general-pages/activate-account/activate-account.component';
import { AppRouteModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from 'src/shared/shared.module';
import { RecoverPasswordComponent } from 'src/general-pages/recover-password/recover-password.component';
import { MFAComponent } from 'src/general-pages/MFA/MFA.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ContactComponent,
    HomeNavbarComponent,
    ErrorPageComponent,
    ActivateAccountComponent,
    RecoverPasswordComponent,
    MFAComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouteModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AdminModule,
    SharedModule
  ],
  providers: [ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule {}
