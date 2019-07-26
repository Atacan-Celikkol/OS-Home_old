import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { BookmarkButtonComponent } from './bookmark-button/bookmark-button.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ContextMenuModule } from 'ngx-contextmenu';
import { DragulaModule } from 'ng2-dragula';
import { BookmarkFilterPipe } from '../core/pipes/bookmark-filter.pipe';

const routes: Routes = [{
  path: '**',
  redirectTo: '',
  component: HomeComponent
}];


@NgModule({
  declarations: [HomeComponent, BookmarkButtonComponent, SearchBarComponent, BookmarkFilterPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContextMenuModule.forRoot(),
    DragulaModule.forRoot(),
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }