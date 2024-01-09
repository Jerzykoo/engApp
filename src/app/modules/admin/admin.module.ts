import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './pages/users/users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRouter } from './admin.router';
import { UserCardComponent } from './pages/users/components/user-card/user-card.component';
import { EditUserDialogComponent } from './components/edit-user-dialog/edit-user-dialog.component';
import { AddUserDialogComponent } from './components/add-user-dialog/add-user-dialog.component';

@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    UserCardComponent,
    EditUserDialogComponent,
    AddUserDialogComponent,
  ],
  imports: [CommonModule, SharedModule, AdminRouter],
})
export class AdminModule {}
