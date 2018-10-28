import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShareManagerService, AlertService } from '../_services';
import { ShareRequest, UserResponse, FilesSummaryResponse } from '../_models';
import { Validators } from '@angular/forms';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';
import { SharedResponse } from '../_models/response/SharedResponse';

@Component({
  selector: 'app-dialog-share-folder',
  templateUrl: './dialog-share-folder.component.html',
  styleUrls: ['./dialog-share-folder.component.scss']
})
export class DialogShareFolderComponent implements OnInit {
  filteredUsers: UserResponse[] = [];
  shares: SharedResponse[];
  isLoading = false;
  fileName: string;
  createFolderForm: FormGroup;
  showLoading: boolean;
  submitted:boolean = false;

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogShareFolderComponent>,
    private alertService: AlertService,
    private shareManaderService: ShareManagerService,
    @Inject(MAT_DIALOG_DATA) public file: FilesSummaryResponse) {
    this.fileName = file.name;

  }

  get f() { return this.createFolderForm.controls; }

  ngOnInit() {
    this.loadUsers();
    this.createFolderForm = this.formBuilder.group({
      name: ['', Validators.required]
    });

    this.f.name.valueChanges.pipe(
      debounceTime(300),
      tap(() => this.isLoading = true),
      switchMap(value => this.shareManaderService.search((value instanceof Object)? value.name : value).pipe(finalize(() => this.isLoading = false)))
    ).subscribe(users => this.filteredUsers = users);
  }

  displayFn(user: UserResponse) {
    if (user) { return user.username; }
  }

  removeShare(file: SharedResponse) {
    let request: ShareRequest = new ShareRequest();
    request.fileId = this.file.id;
    request.userId = file.userId;
    this.showLoading = true;
    this.shareManaderService.unshare(request).subscribe((resp: SharedResponse[]) => {
      //Melhorar e remover a linha apenas
      this.showLoading = false;
      this.loadUsers();
    }, error => {
      this.showLoading = false;
      this.alertService.error(error);
    });
  }

  loadUsers() {
    this.showLoading = true;
    this.shareManaderService.shared(this.file.id).subscribe((resp: SharedResponse[]) => {
      this.showLoading = false;
      this.shares = resp;
    }, error => {
      this.showLoading = false;
      this.alertService.error(error);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.createFolderForm.invalid) {
      return;
    }
    this.submitted = false;
    let request: ShareRequest = new ShareRequest();
    request.fileId = this.file.id;
    request.userId = this.f.name.value.id;
    console.log(JSON.stringify(this.f.name.value));

    this.showLoading = true;
    this.shareManaderService.share(request).subscribe(() => {
      this.f.name.reset('', {emitEvent: true});
      this.loadUsers();
    }, error => {
      this.alertService.error(error);
      this.showLoading = false;
    });
  }

}
