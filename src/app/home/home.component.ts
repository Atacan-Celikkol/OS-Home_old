import { BookmarkService } from './../../services/bookmark.service';
import { Component, OnInit, ViewChild, ElementRef, Input, Output } from '@angular/core';
import { Bookmark } from 'src/models/bookmark';
import { LocalstorageService } from './../../services/localstorage.service';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { Subscription } from 'rxjs/internal/Subscription';
import { DragulaService } from 'ng2-dragula';
import Swal from 'sweetalert2';
declare var $;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {

  @ViewChild('closeModal', { static: true }) closeBtn: ElementRef;
  bookmarkRequest = <Bookmark>{};

  subs = new Subscription();

  @ViewChild(ContextMenuComponent, { static: true }) public basicMenu: ContextMenuComponent;

  constructor(
    private bookmarkService: BookmarkService,
    private dragulaService: DragulaService
  ) {
    this.subs.add(this.dragulaService.dropModel("BOOKMARKS")
      .subscribe(({ sourceModel, targetModel, item }) => {
        // ? targetModel: gives ordered list of given model.
        // TODO: Update bookmarks order.
      })
    );
  }

  editBookmark(e: Bookmark) {
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
        this.bookmarkService.editBookmark(e, { name: result.value[0], url: result.value[1] });
        Swal.fire({
          type: 'success',
          title: 'Bookmark Updated!',
          confirmButtonText: 'OK!'
        })
      }
    })

    // this.bookmarkService.editBookmark(null, null);
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
        })
      }
    })
  }

  createBookmark() {
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
        this.bookmarkService.createBookmark({ name: result.value[0], url: result.value[1] });
        Swal.fire({
          type: 'success',
          title: 'Bookmark Created!',
          confirmButtonText: 'OK!'
        })
      }
    })
  }

}
