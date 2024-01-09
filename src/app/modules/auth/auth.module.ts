import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { AuthRouter } from './auth.router';
import { LoginComponent } from './pages/login/login.component';
import { ErrorPasswordComponent } from './components/error-password/error-password.component';
import { DividerComponent } from './components/divider/divider.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    ErrorPasswordComponent,
    DividerComponent,
    RegisterComponent,
  ],
  imports: [SharedModule, AuthRouter],
})
export class AuthModule {}
