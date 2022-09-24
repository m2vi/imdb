export interface IMDbMovie {
  index: number;
  id: string | null;
  link: string;
  title: string;
  year: number;
  poster: string | null;
  rating: {
    aggregateRating: number;
    voteCount: number;
  };
}
