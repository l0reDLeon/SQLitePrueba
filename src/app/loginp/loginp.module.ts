import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginpPageRoutingModule } from './loginp-routing.module';

import { LoginpPage } from './loginp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginpPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LoginpPage]
})
export class LoginpPageModule {}
