import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Globals } from '../globals'
import { User, UserResponse } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private authenticationAPIPath: string;
    constructor(private http: HttpClient) {
        this.authenticationAPIPath = `${Globals.AUTH_SERVICE_HOST}/users`;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${this.authenticationAPIPath}/login`, { username, password }).pipe(map(response => {
            let user: User = new User();

            if (response && response.token) {
                user = new User();
                user.token = response.token;
                user.tokenType = response.type;
                localStorage.setItem('currentUser', JSON.stringify(user));
            }

            return user;
        }));
    }

    userData() {
        return this.http.get(`${this.authenticationAPIPath}/`).pipe(map((response: UserResponse) => {
            let currentUser: User = JSON.parse(localStorage.getItem('currentUser'));

            if (response) {
                currentUser.name = response.name;
                currentUser.username = response.username;
                currentUser.email = response.email;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }

            return response;
        }));
    }

    logout() {
        this.http.post<any>(`${this.authenticationAPIPath}/logout`, null).subscribe((resp) => { });
        localStorage.removeItem('currentUser');
    }
}