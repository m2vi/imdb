import cache from 'memory-cache';
import type { IMDbMovie } from '../types/imdb';
import imdb from './imdb';

export const imdbMovies = async (): Promise<{ time: number; data: IMDbMovie[] }> => {
  let data = null;
  let time = null;

  const cached = cache.get('imdb');

  if (cached) {
    data = cached?.data;
    time = cached?.time;
  } else {
    data = await imdb.movies();
    time = new Date().getTime();
    cache.put(
      'imdb',
      {
        time: new Date().getTime(),
        data,
      },
      1000 * 60 * 60 * 24
    );
  }

  return {
    time,
    data,
  };
};
