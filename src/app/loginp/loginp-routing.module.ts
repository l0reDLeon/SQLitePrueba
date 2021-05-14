import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginpPage } from './loginp.page';

const routes: Routes = [
  {
    path: '',
    component: LoginpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginpPageRoutingModule {}
