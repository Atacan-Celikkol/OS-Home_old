import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Bookmark } from 'src/models/bookmark';
import { LocalstorageService } from './../../services/localstorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  @ViewChild('closeModal', { static: true }) closeBtn: ElementRef;
  bookmarks = <Bookmark[]>[];
  bookmarkRequest = <Bookmark>{};


  constructor(protected storageSerivce: LocalstorageService) {
    const data = JSON.parse(storageSerivce.getItem('bookmarks'));
    if (data) {
      this.bookmarks = data;
    }
  }

  ngOnInit() {

  }

  createBookmark() {
    this.bookmarks.push(this.bookmarkRequest);
    this.bookmarks = JSON.parse(this.storageSerivce.setItem('bookmarks', JSON.stringify(this.bookmarks)));
    this.closeBtn.nativeElement.click();
  }

}
