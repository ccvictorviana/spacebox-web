import { Component, OnInit } from '@angular/core';
import { FileService, AuthenticationService, AlertService } from '../_services';
// import { MatDialog } from '@angular/material';
import { FilesSummaryResponse, FilesResponse, FileRequest, ShareRequest } from '../_models';
import { CustomMaterialModule } from '../_core/material.module'
import { MatDialog } from '@angular/material';
import { DialogCreateFolderComponent } from '../dialog-create-folder';
import { DialogShareFolderComponent } from '../dialog-share-folder';
import { Router } from '@angular/router';
import { DialogUploadFileComponent } from '../dialog-upload-file';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  files: FilesSummaryResponse[] = [];
  showLoading: boolean;
  callStackFileParentId = [];

  constructor(private router: Router,
    private alertService: AlertService,
    private fileService: FileService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.loadFiles(null);
  }

  logout() {
    this.router.navigate(['/login']);
  }

  loadFiles(parentFileId: number) {
    this.addCurrentFileParentId(parentFileId);
    this.showLoading = true;
    this.fileService.list(this.getCurrentFileParenId()).subscribe((resp: FilesResponse) => {
      this.showLoading = false;
      this.files = resp.files;
    }, error => {
      this.showLoading = false;
    });
  }

  backFolder() {
    this.loadFiles(this.getPreviousFileParenId());
  }

  addCurrentFileParentId(fileParentId: number) {
    if (!this.callStackFileParentId.includes(fileParentId))
      this.callStackFileParentId.push(fileParentId);
  }

  getCurrentFileParenId() {
    let currentFileParentId: number = null;
    if (this.callStackFileParentId.length > 0)
      currentFileParentId = this.callStackFileParentId[this.callStackFileParentId.length - 1];

    return currentFileParentId;
  }

  getPreviousFileParenId() {
    this.callStackFileParentId.pop();
    return this.getCurrentFileParenId();
  }

  refreshFiles() {
    this.loadFiles(this.getCurrentFileParenId());
  }

  selectFile(file: FilesSummaryResponse) {
    if (file.type) {
      this.downloadFile(file);
    } else {
      this.loadFiles(file.id)
    }
  }

  openModalAddFolder() {
    let data: FileRequest = new FileRequest();
    data.fileParentId = this.getCurrentFileParenId();

    const dialogRef = this.dialog.open(DialogCreateFolderComponent, {
      width: '600px',
      data: data
    });

    dialogRef.componentInstance.onCreate.subscribe(() => {
      this.refreshFiles();
    });
  }

  openModalUploadFile() {
    let data: FileRequest = new FileRequest();
    data.fileParentId = this.getCurrentFileParenId();
    console.log(JSON.stringify(data));
    const dialogRef = this.dialog.open(DialogUploadFileComponent, {
      width: '600px',
      data: data
    });

    dialogRef.componentInstance.onUploaded.subscribe(() => {
      this.refreshFiles();
    });
  }

  openModalShareFolder(file: FilesSummaryResponse) {
    this.dialog.open(DialogShareFolderComponent, {
      width: '600px',
      data: file
    });
  }

  deleteFile(file: FilesSummaryResponse) {
    this.showLoading = true;
    this.fileService.delete(file).subscribe(() => {
      this.showLoading = false;
      this.refreshFiles();
    }, error => {
      this.showLoading = false;
      this.alertService.error(error);
    });
  }

  downloadFile(file: FilesSummaryResponse) {
    this.fileService.download(file).subscribe((res) => {
      let options = { type: `${file.type};charset=utf-8;` };
      this.createAndDownloadBlobFile(res, options, file.name);
    }, error => {
      this.alertService.error(error);
    });
  }

  createAndDownloadBlobFile(body, options, filename) {
    var blob = new Blob([body], options);
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, filename);
    }
    else {
      var link = document.createElement('a');
      // Browsers that support HTML5 download attribute
      if (link.download !== undefined) {
        var url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
}
