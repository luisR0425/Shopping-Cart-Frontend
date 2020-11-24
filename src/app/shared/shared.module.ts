import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { CartComponent } from './components/cart/cart.component';
import {HeaderComponent} from './components/header/header.component';
import {MaterialModule} from '../material/material.module';


@NgModule({
  declarations: [
    HeaderComponent,
    CartComponent
  ],
  exports: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
