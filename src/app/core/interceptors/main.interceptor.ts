import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { TokenService } from 'src/app/core/services/token.service';
import { AuthService } from 'src/app/modules/auth/store/service';
import { HotToastService } from '@ngneat/hot-toast';
import { environment } from 'src/environments/environment';

@Injectable()
export class MainInterceptor implements HttpInterceptor {
  private headers: { [name: string]: string | string[] } = {};
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<boolean | null> =
    new BehaviorSubject<boolean | null>(null);

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private toast: HotToastService
  ) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.headers = request.url.includes(environment.apiUrl)
      ? this.addHeaders()
      : {};

    return next.handle(request.clone({ setHeaders: this.headers })).pipe(
      catchError((err: any) => {
        if (err.status === 401 && this.tokenService.getToken()) {
        } else if (err.status >= 400 && err.status < 500) {
          this.toast.warning(
            Array.isArray(err.error.message)
              ? err.error.message[0]
              : err.error.message
          );
        } else {
          this.toast.error('Błąd serwera');
        }
        return throwError(err);
      })
    );
  }

  private addHeaders(): { [name: string]: string | string[] } {
    const token = this.tokenService.getToken();
    const headers: { [name: string]: string | string[] } = {};
    token
      ? (headers['Authorization'] = 'Bearer ' + token)
      : delete headers['Authorization'];
    return headers;
  }
}
