import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Angular Material
import {MatSliderModule } from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatNativeDateModule } from '@angular/material/core';
import {FormsModule} from '@angular/forms';
import {MatRadioModule } from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';








@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatRadioModule,
    MatTableModule,
    MatGridListModule
  ],
  exports: [
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    FormsModule,
    MatRadioModule,
    MatTableModule,
    MatGridListModule
  ]
})
export class SharedModule { }
