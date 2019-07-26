import { Pipe, PipeTransform } from '@angular/core';
import { Bookmark } from '../models/bookmark';

@Pipe({
  name: 'bookmarkFilter'
})
export class BookmarkFilterPipe implements PipeTransform {
  transform(items: Bookmark[], isFooter: boolean): any {
    return items.filter(x => x.isFooter === isFooter);
  }
}
