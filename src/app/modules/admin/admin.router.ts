import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { NoAuthGuard } from 'src/app/core/guards/no-auth.guard';
import { LoginComponent } from 'src/app/modules/auth/pages/login/login.component';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './pages/users/users.component';
import { AchievementsComponent } from './pages/achievements/achievements.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { SuccessComponent } from './pages/success/success.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'achievements', component: AchievementsComponent },
      { path: 'quiz', component: QuizComponent },
      { path: 'success', component: SuccessComponent },
      { path: '**', redirectTo: '/admin/users' },
      // { path: '**', redirectTo: '/start' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  // providers: [],
  providers: [AuthGuard],
})
export class AdminRouter {}
