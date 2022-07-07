import { moviesMock } from "./moviesMock"

interface Movie {
  title: string
  episode_id: number
  opening_crawl: string
  director: string
  producer: string
  release_date: string
  created: string
  edited: string
  url: string
}

interface CancellablePromise<T> extends Promise<T> {
  cancel: () => void
}

type QueryPromise = CancellablePromise<Movie[]>


export const getSuggestions = (search: string): QueryPromise => {
  let  timer: ReturnType<typeof setTimeout>;
  const promise: Partial<QueryPromise> = new Promise((resolve) => {
    timer = setTimeout(
      () => resolve(moviesMock.filter(movie => movie.title.includes(search))),
      1000
    );
  });
  promise.cancel = () => {
    if (timer) clearTimeout(timer);
  };
  return promise as QueryPromise;
}