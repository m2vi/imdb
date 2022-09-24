import { imdbMovies } from '../../api/cache';

export async function get() {
  return new Response(JSON.stringify((await imdbMovies()).data ?? null), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
