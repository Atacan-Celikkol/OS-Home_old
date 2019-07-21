import { LocalstorageService } from './localstorage.service';
import { Injectable } from '@angular/core';
import { Bookmark } from 'src/models/bookmark';

@Injectable({
    providedIn: 'root'
})
export class BookmarkService {

    private Bookmarks = [] as Bookmark[];

    constructor(private storageService: LocalstorageService) {
        const data = JSON.parse(storageService.getItem('bookmarks'));
        if (data) {
            this.Bookmarks = data;
        }
    }

    createBookmark(e: Bookmark) {
        this.Bookmarks.push(e);
        this.setBookmarks();
    }

    editBookmark(old: Bookmark, e: Bookmark) {
        this.Bookmarks[this.Bookmarks.indexOf(old)] = e;
        this.setBookmarks();
    }

    deleteBookmark(e: Bookmark) {
        this.Bookmarks = this.Bookmarks.filter(x => x !== e);
        this.setBookmarks();
    }

    updateBookmarks(e: Bookmark[]) {
        this.Bookmarks = e;
        this.setBookmarks();
    }

    private setBookmarks() {
        this.Bookmarks = JSON.parse(this.storageService.setItem('bookmarks', JSON.stringify(this.Bookmarks)));
    }



}
