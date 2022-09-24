import type { IMDbMovie } from '../types/imdb';
import Scraper from './scraper';

class IMDb {
  private async html() {
    const html = await fetch('https://www.imdb.com/chart/top/', {
      headers: {
        'Accept-Language': 'en-US,en;q=0.9,de-DE;q=0.8,de;q=0.7',
      },
    })
      .then((res) => res.text())
      .catch(() => null);

    return html;
  }

  public async movies(): Promise<IMDbMovie[] | null> {
    const html = await this.html();
    if (!html) return null;

    const scraper = new Scraper(html);

    const table = scraper.table();

    const items = table
      .map((i, el) => {
        const base = scraper.tableElBase(el);
        const rating = scraper.tableElRating(el);

        return {
          index: i + 1,
          ...base,
          ...rating,
        };
      })
      .get();

    return items;
  }
}

export const imdb = new IMDb();
export default imdb;
