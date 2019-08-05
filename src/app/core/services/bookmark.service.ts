import { Injectable } from '@angular/core';
import data from '../../../data.json';
import { Bookmark } from '../models/bookmark';
import { LocalStorageService } from './localStorage.service';

const storageNames = {
    bookmarks: 'bookmarks',
    footerBookmarks: 'footer-bookmarks'
};

@Injectable({
    providedIn: 'root'
})
export class BookmarkService {

    public Bookmarks = [] as Bookmark[];
    public FooterBookmarks = [] as Bookmark[];

    constructor(private storageService: LocalStorageService) {
        const bookmarks = JSON.parse(storageService.getItem(storageNames.bookmarks));
        const footerBookmarks = JSON.parse(storageService.getItem(storageNames.footerBookmarks));

        if (bookmarks) {
            this.Bookmarks = bookmarks;
        } else {
            this.Bookmarks = data.bookmarks;
            this.setBookmarks();
        }

        if (footerBookmarks) {
            this.FooterBookmarks = footerBookmarks;
        } else {
            this.FooterBookmarks = data.footer_bookmarks;
            this.setBookmarks();
        }
    }
    createBookmark(e: Bookmark, isFooter = false) {
        if (!isFooter) {
            this.Bookmarks.push(e);
            this.setBookmarks();
        } else {
            this.FooterBookmarks.push(e);
            this.setBookmarks(true);
        }
    }

    editBookmark(old: Bookmark, e: Bookmark, isFooter = false) {
        if (!isFooter) {
            this.Bookmarks[this.Bookmarks.indexOf(old)] = e;
            this.setBookmarks();
        } else {
            this.FooterBookmarks[this.FooterBookmarks.indexOf(old)] = e;
            this.setBookmarks(true);
        }
    }

    deleteBookmark(e: Bookmark, isFooter = false) {
        if (!isFooter) {
            this.Bookmarks = this.Bookmarks.filter(x => x !== e);
            this.setBookmarks();
        } else {
            this.FooterBookmarks = this.FooterBookmarks.filter(x => x !== e);
            this.setBookmarks(true);
        }
    }

    updateBookmarks(e: Bookmark[], isFooter = false) {
        if (!isFooter) {
            this.Bookmarks = e;
            this.setBookmarks();
        } else {
            this.FooterBookmarks = e;
            this.setBookmarks(true);
        }
    }

    private setBookmarks(isFooter = false) {
        isFooter ?
            this.FooterBookmarks = JSON.parse(this.storageService.setItem(storageNames.footerBookmarks, JSON.stringify(this.FooterBookmarks))) :
            this.Bookmarks = JSON.parse(this.storageService.setItem(storageNames.bookmarks, JSON.stringify(this.Bookmarks)));
    }
}
