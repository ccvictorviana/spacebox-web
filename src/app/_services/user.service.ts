import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserRequest } from '../_models';
import { Globals } from '../globals';

@Injectable({ providedIn: 'root' })
export class UserService {
    private userAPIPath: string;
    constructor(private http: HttpClient) {
        this.userAPIPath = `${Globals.AUTH_SERVICE_HOST}/users`;
    }

    register(data: UserRequest) {
        return this.http.post(`${this.userAPIPath}/`, data);
    }
}