import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Globals } from './globals';
import { CustomMaterialModule } from './_core/material.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';

import { LoginComponent } from './login';
import { ProfileComponent } from './profile';
import { DashboardComponent } from './dashboard';
import { NotificationsComponent } from './notifications';
import { AlertComponent } from './_directives';
import { RegisterComponent } from './register';
import { FileSizeModule } from 'ngx-filesize';

import { MatFileUploadModule } from '../libs/mat-upload/matFileUpload.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { AlertService, AuthenticationService, UserService, FileService, ShareManagerService } from './_services';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material';
import { DialogCreateFolderComponent } from './dialog-create-folder/dialog-create-folder.component';
import { DialogShareFolderComponent } from './dialog-share-folder/dialog-share-folder.component';
import { DialogUploadFileComponent } from './dialog-upload-file/dialog-upload-file.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NotificationsComponent,
    ProfileComponent,
    LoginComponent,
    AlertComponent,
    RegisterComponent,
    DialogCreateFolderComponent,
    DialogShareFolderComponent,
    DialogUploadFileComponent
  ],
  imports: [
    MatToolbarModule,
    MatTableModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    CustomMaterialModule,
    MatFileUploadModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatButtonModule,
    FileSizeModule
  ],
  providers: [
    Globals,
    AlertService,
    AuthenticationService,
    UserService,
    FileService,
    ShareManagerService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ],
  entryComponents: [DialogCreateFolderComponent, DialogShareFolderComponent, DialogUploadFileComponent],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
