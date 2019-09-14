import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { DragulaModule } from 'ng2-dragula';
import { ContextMenuModule } from 'ngx-contextmenu';
import { BookmarkFilterPipe } from '../core/pipes/bookmark-filter.pipe';
import { BookmarkButtonComponent } from './bookmark-button/bookmark-button.component';
import { ExtensionsModule } from './extensions/extensions.module';
import { HomeComponent } from './home.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

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
    ExtensionsModule,
    ContextMenuModule.forRoot(),
    DragulaModule.forRoot(),
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
