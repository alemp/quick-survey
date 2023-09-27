import { Injectable } from '@angular/core';
import { Environment } from '../dtos/environment.dto';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class EnvironmentService {
  private environment?: Environment = undefined;

  constructor(private readonly http: HttpClient) {
  }

  getEnvironment(): Environment {
    return this.environment!;
  }

  load(): Promise<any> {
    console.log(`getSettings:: before http.get call`);
    return this.http
      .get<Environment>('../assets/env/environment.json')
      .toPromise()
      .then((environment) => {
        this.environment = environment;
        return environment;
      });
  }
}
