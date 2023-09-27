import { Injectable } from '@angular/core';
import {IEnvironment} from "../dtos/environment.dto";
import {HttpClient} from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class EnvironmentService {
  private environment?: IEnvironment = undefined;

  constructor(private readonly http: HttpClient) {}

  getEnvironment(): IEnvironment {
    return this.environment!;
  }

  load(): Promise<any> {
    console.log(`getSettings:: before http.get call`);
    return this.http
      .get<IEnvironment>('../assets/env/environment.json')
      .toPromise()
      .then((environment) => {
        this.environment = environment;
        return environment;
      });
  }
}
