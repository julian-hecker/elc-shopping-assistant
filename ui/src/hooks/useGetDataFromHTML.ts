// @ts-ignore
import { jsdom } from 'jsdom-jscore-rn';

export function usetGetDocFromHTML() {
  function getDocFromHTML(html: string): Document {
    const doc = jsdom(html);
    return doc;
  }

  return { getDocFromHTML };
}
