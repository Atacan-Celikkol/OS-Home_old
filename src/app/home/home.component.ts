import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Bookmark } from 'src/models/bookmark';
import { LocalstorageService } from './../../services/localstorage.service';
import { ContextMenuComponent } from 'ngx-contextmenu';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  @ViewChild('closeModal', { static: true }) closeBtn: ElementRef;
  bookmarks = <Bookmark[]>[];
  bookmarkRequest = <Bookmark>{};


  @ViewChild(ContextMenuComponent, { static: true }) public basicMenu: ContextMenuComponent;

  constructor(protected storageSerivce: LocalstorageService) {
    const data = JSON.parse(storageSerivce.getItem('bookmarks'));
    if (data) {
      this.bookmarks = data;
      this.bookmarks = this.bookmarks.sort((val1, val2) => {
        console.log(val1.name, val2.name);

        if (val1.name > val2.name) {
          return 1;
        }
        return -1;
      });
    }
  }

  ngOnInit() {

  }
  
  editBookmark(e: Bookmark) {

  }

  deleteBookmark(e: Bookmark) {
    this.bookmarks = this.bookmarks.filter(x => x !== e);
    this.bookmarks = JSON.parse(this.storageSerivce.setItem('bookmarks', JSON.stringify(this.bookmarks)));
  }

  createBookmark() {
    this.bookmarks.push(this.bookmarkRequest);
    this.bookmarks = JSON.parse(this.storageSerivce.setItem('bookmarks', JSON.stringify(this.bookmarks)));
    this.closeBtn.nativeElement.click();
  }

}
