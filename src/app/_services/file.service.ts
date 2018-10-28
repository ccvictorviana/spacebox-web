import { Injectable } from '@angular/core';
import { Globals } from '../globals'
import { FileFilterRequest, FilesSummaryResponse, FileRequest } from '../_models'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private aPIPath: string;
  constructor(private http: HttpClient) {
    this.aPIPath = `${Globals.FILE_SERVICE_HOST}/files`;
  }

  list(fileParentId: number) {
    let file: FileFilterRequest = new FileFilterRequest();
    file.fileParentId = fileParentId;
    return this.http.post(`${this.aPIPath}/list`, file);
  }

  delete(file: FilesSummaryResponse) {
    return this.http.delete(`${this.aPIPath}/?fileId=${file.id}`);
  }

  create(request: FileRequest) {
    return this.http.post(`${this.aPIPath}/`, request);
  }

  download(file: FilesSummaryResponse) {
    return this.http.get(`${this.aPIPath}/download?fileId=${file.id}`, { responseType: 'blob' });
  }
}