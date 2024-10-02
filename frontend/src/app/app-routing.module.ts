import { AdminComponent } from 'src/admin/admin.component';
import { ActivateAccountComponent } from 'src/general-pages/activate-account/activate-account.component';
import { ContactComponent } from 'src/general-pages/contact/contact.component';
import { ErrorPageComponent } from 'src/general-pages/error-page/error-page.component';
import { HomeComponent } from 'src/general-pages/home/home.component';
import { LoginComponent } from 'src/general-pages/login/login.component';
import { RegisterComponent } from 'src/general-pages/register/register.component';
import { RecoverPasswordComponent } from 'src/general-pages/recover-password/recover-password.component';

import { canActivateAdmin, canActivateUser } from 'src/shared/guards/auth-guards';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'activate-account/:email', component: ActivateAccountComponent },
      { path: 'recover-password', component: RecoverPasswordComponent }
    ]
  },
  { path: 'contact', component: ContactComponent },
  {
    path: 'user',
    loadChildren: () => import('src/user/user.module').then(m => m.UserModule),
    canActivate: [canActivateUser],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'admin',
    loadChildren: () => import('src/admin/admin.module').then(m => m.AdminModule),
    canActivate: [canActivateAdmin],
    runGuardsAndResolvers: 'always'
  },
  { path: '**', component: ErrorPageComponent },
  { path: 'error-page', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRouteModule {}
