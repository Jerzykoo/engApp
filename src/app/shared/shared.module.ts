import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { AppMaterialModule } from '../app.material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ButtonComponent } from './components/button/button.component';
import { PopoverComponent } from './components/popover/popover.component';
import { PublisherCardComponent } from './components/publisher-card/publisher-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconComponent } from './components/icon/icon.component';
import { QuestionCardComponent } from './components/question-card/question-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// import { NgxLoaderIndicatorModule } from 'ngx-loader-indicator';
// import { NgxLoaderIndicatorModule } from 'ngx-loader-indicator';
@NgModule({
  declarations: [
    NavbarComponent,
    ButtonComponent,
    PopoverComponent,
    PublisherCardComponent,
    FooterComponent,
    IconComponent,
    QuestionCardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    PortalModule,
    FontAwesomeModule,
    // NgxLoaderIndicatorModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    RouterModule,
    NavbarComponent,
    ButtonComponent,
    PopoverComponent,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    PublisherCardComponent,
    FooterComponent,
    FontAwesomeModule,
    IconComponent,

    // NgxLoaderIndicatorModule,
  ],
})
export class SharedModule {}
