import { Component, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FileRequest } from '../_models';
import { Globals } from '../globals';

@Component({
  selector: 'app-dialog-upload-file',
  templateUrl: './dialog-upload-file.component.html'
})
export class DialogUploadFileComponent {
  onUploaded = new EventEmitter();
  httpUrlUpload: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: FileRequest) {
    this.httpUrlUpload = `${Globals.FILE_SERVICE_HOST}/files/upload`
  }
}