import Mdit from 'markdown-it';
import wikilinks from 'markdown-it-wikitext';

export const md = Mdit().use(wikilinks({
  uriSuffix: '',
}));
