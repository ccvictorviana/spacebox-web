import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  authServiceHost: string = 'https://spacebox-auth-service.herokuapp.com';
  fileServiceHost: string = 'https://spacebox-file-service.herokuapp.com';

  // Config DEV
  // authServiceHost: string = 'http://localhost:7531';
  // fileServiceHost: string = 'http://localhost:8531';
}