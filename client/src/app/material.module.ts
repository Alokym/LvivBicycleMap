import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  MatButtonModule,
  MatCheckboxModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule
  ],
})
export class AppMaterialModule { }
