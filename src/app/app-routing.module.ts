import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { RegularGuard } from './guards/regular.guard';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [RegularGuard], canLoad: [RegularGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [RegularGuard], canLoad: [RegularGuard] },
  { path: 'about', component: AboutComponent, canActivate: [RegularGuard], canLoad: [RegularGuard] },
  { path: 'schedule', component: ScheduleComponent, canActivate: [RegularGuard], canLoad: [RegularGuard] },
  { path: 'contact-us', component: ContactUsComponent, canActivate: [RegularGuard], canLoad: [RegularGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
