import cache from 'memory-cache';

export async function get() {
  cache.clear();

  return new Response(
    JSON.stringify({
      flushed: 'OK',
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
