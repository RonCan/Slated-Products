import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {DetailsModalComponent} from './details-modal/details-modal.component';

const routes: Routes = [
  { path: 'detail/:id', component: DetailsModalComponent }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
