import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './pages/users/users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRouter } from './admin.router';
import { UserCardComponent } from './pages/users/components/user-card/user-card.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { ListeningComponent } from './pages/listening/listening.component';
import { SuccessComponent } from './pages/success/success.component';
import { RebusComponent } from './pages/rebus/rebus.component';
import { AchievementsComponent } from './pages/achievements/achievements.component';

@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    UserCardComponent,
    QuizComponent,
    ListeningComponent,
    SuccessComponent,
    RebusComponent,
    AchievementsComponent,
  ],
  imports: [CommonModule, SharedModule, AdminRouter],
})
export class AdminModule {}
