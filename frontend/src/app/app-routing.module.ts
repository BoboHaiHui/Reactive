
import { ContactComponent } from 'src/general-pages/contact/contact.component';
import { HomeComponent } from 'src/general-pages/home/home.component';
import { LoginComponent } from 'src/general-pages/login/login.component';
import { RegisterComponent } from 'src/general-pages/register/register.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component:HomeComponent, children: [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
  ]},
  {path: 'contact', component:ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRouteModule { }
