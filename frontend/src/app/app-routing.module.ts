import { AdminComponent } from 'src/admin/admin.component';
import { ContactComponent } from 'src/general-pages/contact/contact.component';
import { ErrorPageComponent } from 'src/general-pages/error-page/error-page.component';
import { HomeComponent } from 'src/general-pages/home/home.component';
import { LoginComponent } from 'src/general-pages/login/login.component';
import { RegisterComponent } from 'src/general-pages/register/register.component';
import { UserComponent } from 'src/user/user.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  { path: 'contact', component: ContactComponent },
  { path: 'user', component: UserComponent },
  {
    path: 'admin',
    component: AdminComponent
  },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRouteModule {}
