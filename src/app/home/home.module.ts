import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { BookmarkButtonComponent } from './bookmark-button/bookmark-button.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

const routes: Routes = [{
  path: '**',
  redirectTo: '',
  component: HomeComponent
}];


@NgModule({
  declarations: [HomeComponent, BookmarkButtonComponent, SearchBarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }