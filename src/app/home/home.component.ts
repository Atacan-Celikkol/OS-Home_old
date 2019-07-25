import { BookmarkService } from './../../services/bookmark.service';
import { Component, ViewChild } from '@angular/core';
import { Bookmark } from 'src/models/bookmark';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { Subscription } from 'rxjs/internal/Subscription';
import { DragulaService } from 'ng2-dragula';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {

  subs = new Subscription();

  @ViewChild(ContextMenuComponent, { static: true }) public basicMenu: ContextMenuComponent;

  constructor(
    protected bookmarkService: BookmarkService,
    protected dragulaService: DragulaService
  ) { this.subscribeDragula(); }

  subscribeDragula() {
    this.subs.add(this.dragulaService.dropModel('BOOKMARKS')
      .subscribe(({ sourceModel, targetModel, item }) => {
        this.bookmarkService.updateBookmarks(targetModel);
      })
    );
  }

  editBookmark(e: Bookmark, isFooter: boolean) {
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      inputValidator: result => !result && 'You need to fill inputs!',
      progressSteps: ['1', '2']
    }).queue([
      {
        title: 'Bookmark Name',
        text: 'Please write a bookmark name.',
        inputValue: e.name
      },
      {
        title: 'URL',
        text: 'Please input bookmark URL.',
        inputValue: e.url
      },
    ]).then((result) => {
      if (result.value) {
        console.log(result.value);
        this.bookmarkService.editBookmark(e, { name: result.value[0], url: result.value[1], imageUrl: null, isFooter });
        Swal.fire({
          type: 'success',
          title: 'Bookmark Updated!',
          confirmButtonText: 'OK!'
        });
      }
    });
  }

  deleteBookmark(e: Bookmark) {
    Swal.fire({
      title: 'Are you sure?',
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.bookmarkService.deleteBookmark(e);
        Swal.fire({
          type: 'success',
          title: 'Bookmark Deleted!',
          confirmButtonText: 'OK!'
        });
      }
    });
  }

  createBookmark(isFooter: boolean) {
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      inputValidator: result => !result && 'You need to fill inputs!',
      progressSteps: ['1', '2']
    }).queue([
      {
        title: 'Bookmark Name',
        text: 'Please write a bookmark name.',
      },
      {
        title: 'URL',
        text: 'Please input bookmark URL.'
      },
    ]).then((result) => {
      if (result.value) {
        this.bookmarkService.createBookmark({ name: result.value[0], url: result.value[1], imageUrl: null, isFooter });
        Swal.fire({
          type: 'success',
          title: 'Bookmark Created!',
          confirmButtonText: 'OK!'
        });
      }
    });
  }

}
