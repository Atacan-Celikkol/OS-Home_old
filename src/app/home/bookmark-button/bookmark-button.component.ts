import { Component, Input } from '@angular/core';
import { Bookmark } from '../../../models/bookmark';

@Component({
  selector: 'bookmark-button',
  templateUrl: './bookmark-button.component.html',
  styleUrls: ['./bookmark-button.component.less']
})
export class BookmarkButtonComponent {

  @Input() bookmark: Bookmark;

  constructor() { }

}
