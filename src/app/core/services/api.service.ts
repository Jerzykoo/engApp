import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { withCache } from '@ngneat/cashew';
import { ContextOptions } from '@ngneat/cashew/lib/cache-context';
import { environment } from 'src/environments/environment';
import { prepareParams } from 'src/app/utils/utils';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public get(
    path: string,
    params?: Record<string, any>,
    cashewOptions: ContextOptions = { cache: false }
  ): Observable<any> {
    return this.http.request('get', environment.apiUrl + path, {
      params: prepareParams(params),
      context: withCache(cashewOptions),
    });
  }

  public post(path: string, body?: Record<string, any>): Observable<any> {
    return this.http.request('post', environment.apiUrl + path, { body });
  }

  public put(path: string, body?: Record<string, any>): Observable<any> {
    return this.http.request('put', environment.apiUrl + path, { body });
  }

  public patch(path: string, body?: Record<string, any>): Observable<any> {
    return this.http.request('patch', environment.apiUrl + path, { body });
  }

  public delete(path: string, params?: Record<string, any>): Observable<any> {
    return this.http.request('delete', environment.apiUrl + path, {
      params: prepareParams(params),
    });
  }
}
