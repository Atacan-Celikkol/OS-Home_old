import { Component, Input } from '@angular/core';

@Component({
  selector: 'bookmark-button',
  templateUrl: './bookmark-button.component.html',
  styleUrls: ['./bookmark-button.component.less']
})
export class BookmarkButtonComponent {

  @Input() url: string;
  @Input() name: string;

  constructor() { }

}
