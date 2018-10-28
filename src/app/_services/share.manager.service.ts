import { Injectable } from '@angular/core';
import { Globals } from '../globals'
import { ShareRequest, UserResponse } from '../_models'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareManagerService {
  private aPIPath: string;
  constructor(private http: HttpClient) {
    this.aPIPath = `${Globals.FILE_SERVICE_HOST}/share`;
  }

  search(name: string): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${this.aPIPath}/users?name=${name}`);
  }

  share(data: ShareRequest) {
    return this.http.post(`${this.aPIPath}/`, data);
  }

  unshare(data: ShareRequest) {
    return this.http.post(`${this.aPIPath}/unshare`, data);
  }

  shared(fileId: number) {
    return this.http.get(`${this.aPIPath}/?fileId=${fileId}`);
  }
}