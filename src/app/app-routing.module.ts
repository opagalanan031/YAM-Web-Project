import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { CoreDashboardComponent } from './components/core-dashboard/core-dashboard.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { AnyMemberGuard } from './guards/any-member.guard';
import { CoreGuard } from './guards/core.guard';
import { RegularGuard } from './guards/regular.guard';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [RegularGuard], canLoad: [RegularGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [RegularGuard], canLoad: [RegularGuard] },
  { path: 'about', component: AboutComponent, canActivate: [RegularGuard], canLoad: [RegularGuard] },
  { path: 'schedule', component: ScheduleComponent, canActivate: [AnyMemberGuard], canLoad: [AnyMemberGuard] },
  { path: 'contact-us', component: ContactUsComponent, canActivate: [RegularGuard], canLoad: [RegularGuard] },
  { path: 'core-dashboard', component: CoreDashboardComponent, canActivate: [CoreGuard], canLoad: [CoreGuard] },
  { path: 'members', component: MemberListComponent, canActivate: [CoreGuard], canLoad: [CoreGuard] },
  { path: 'messages', component: MessagesComponent, canActivate: [CoreGuard], canLoad: [CoreGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
