import { LocalstorageService } from './localstorage.service';
import { Injectable, Input } from '@angular/core';
import { Bookmark } from 'src/models/bookmark';

@Injectable({
    providedIn: 'root'
})
export class BookmarkService {

    // public readonly bookmarks = this.Bookmarks;
    private Bookmarks = <Bookmark[]>[];

    constructor(private storageService: LocalstorageService) {
        const data = JSON.parse(storageService.getItem('bookmarks'));
        if (data) {
            this.Bookmarks = data;
        }
    }

    get bookmarks() {
        return this.Bookmarks;
    }

    createBookmark(e: Bookmark) {
        this.Bookmarks.push(e);
        this.setBookmark();
    }

    editBookmark(old: Bookmark, e: Bookmark) {
        this.bookmarks[this.Bookmarks.indexOf(old)] = e;
        this.setBookmark();
    }

    deleteBookmark(e: Bookmark) {
        this.Bookmarks = this.Bookmarks.filter(x => x !== e);
        this.setBookmark();
    }

    private setBookmark() {
        this.Bookmarks = JSON.parse(this.storageService.setItem('bookmarks', JSON.stringify(this.Bookmarks)));
    }



}
