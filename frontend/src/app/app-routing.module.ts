import { HomeComponent } from 'src/general-pages/home/home.component';
import { NavbarComponent } from 'src/shared/components/navbar/navbar.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component:NavbarComponent, children: [
    {path: 'home', component: HomeComponent},
    // {path: 'login', component: LoginComponent},
    // {path: 'register', component: RegisterComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
