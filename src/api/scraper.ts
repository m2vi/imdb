import cheerio, { CheerioAPI, Element } from 'cheerio';
import { removeQueryParams } from '../utils/utils';

class Scraper {
  $: CheerioAPI;
  constructor(html: string) {
    this.$ = cheerio.load(html);
  }

  private tableElPoster(table_el: Element) {
    const poster = this.$(table_el).find('td.posterColumn img').attr('src');

    if (!poster) return null;

    return poster;
  }

  table() {
    return this.$('table.chart.full-width tbody tr');
  }

  tableElBase(table_el: Element) {
    const id = this.$(table_el).find('td.titleColumn a').attr('href')?.split('/')?.[2] ?? null;
    const title = this.$(table_el).find('td.titleColumn a').text();
    const year = parseInt(this.$(table_el).find('td.titleColumn span.secondaryInfo').text().match(/\d+/)?.[0] ?? '');
    const link = removeQueryParams(`https://www.imdb.com${this.$(table_el).find('td.titleColumn a').attr('href')}`);
    const poster = this.tableElPoster(table_el);

    return {
      id,
      link,
      title,
      year,
      poster,
    };
  }

  tableElRating(table_el: Element) {
    const rating = parseFloat(this.$(table_el).find('td.ratingColumn.imdbRating strong').text().replace(/,/g, '.'));
    const voteCount = parseInt(
      this.$(table_el)
        .find('td.ratingColumn.imdbRating strong')
        .attr('title')
        ?.replace(/,/g, '')
        ?.split('based on')?.[1]
        ?.match(/\d+/)?.[0] ?? '0'
    );

    return {
      rating: {
        aggregateRating: rating,
        voteCount,
      },
    };
  }
}

export default Scraper;
