import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { EnvironmentService } from '../services/environment.service';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ApiUrlInterceptor implements HttpInterceptor {
  constructor(private readonly environmentService: EnvironmentService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('assets')) {
      return next.handle(req);
    }

    const env = this.environmentService.getEnvironment();
    const modified = req.clone({
      url: env.apiUrl + req.url,
      headers: req.headers.set('api-version', `v${1}`),
    });

    return next.handle(modified);
  }
}
