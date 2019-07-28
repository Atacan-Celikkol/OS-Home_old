import { Component, Input } from '@angular/core';
import { Bookmark } from './../../core/models/bookmark';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'bookmark-button',
  templateUrl: './bookmark-button.component.html',
  styleUrls: ['./bookmark-button.component.less']
})
export class BookmarkButtonComponent {

  @Input() bookmark: Bookmark;
  @Input() isFooter = false;

  constructor() { }
}
