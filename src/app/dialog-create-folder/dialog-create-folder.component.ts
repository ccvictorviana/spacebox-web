import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FileRequest } from '../_models';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { FileService, AlertService } from '../_services';

@Component({
  selector: 'app-dialog-create-folder',
  templateUrl: './dialog-create-folder.component.html'
})
export class DialogCreateFolderComponent {
  onCreate = new EventEmitter();
  showLoading: boolean;
  createFolderForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogCreateFolderComponent>,
    private alertService: AlertService,
    private fileService: FileService,
    @Inject(MAT_DIALOG_DATA) public data: FileRequest) { }

  ngOnInit() {
    this.createFolderForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  get f() { return this.createFolderForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.createFolderForm.invalid) {
      return;
    }
    this.showLoading = true;
    this.data.name = this.f.name.value;

    this.fileService.create(this.data).subscribe(() => {
      this.showLoading = this.submitted = false;
      this.dialogRef.close();
      this.onCreate.emit(this.data);
    }, error => {
      this.showLoading = this.submitted = false;
      this.alertService.error(error);
    });
  }
}