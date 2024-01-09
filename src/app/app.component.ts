import { Component } from '@angular/core';
import { customIconsConfig } from './shared/custom-icons.config';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private titleService: Title,
    private domSanitizer: DomSanitizer
  ) {
    this.loadCustomIcons();
  }

  public ngOnInit(): void {
    this.titleService.setTitle(environment.appName);
  }

  public loadCustomIcons(): void {
    if (customIconsConfig) {
      customIconsConfig.icons.forEach((icon) => {
        this.matIconRegistry.addSvgIcon(
          icon,
          this.domSanitizer.bypassSecurityTrustResourceUrl(
            `../../assets/icons/${icon}.svg`
          )
        );
      });
    }
  }
}
