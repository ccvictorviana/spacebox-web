import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule} from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
//import { MatDialog } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        //MatDialog,
        MatCardModule,
        MatInputModule,
        MatMenuModule,
        MatFormFieldModule
    ],
    exports: [
        CommonModule,
        //MatDialog,
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule
    ],
})
export class CustomMaterialModule { }