import { IShow, IEpisode, IShowAPI } from './interfaces.ts';

const MISSING_IMAGE_URL = "https://tinyurl.com/missing-tv";
const TVMAZE_API_URL = "https://api.tvmaze.com/";


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

// async function searchShowsByTerm(term: string): Promise<Array<IShow>> { //TODO: Same as below syntatic sugar
async function searchShowsByTerm(term: string): Promise<IShow[]> {
  // ADD: Remove placeholder & make request to TVMaze search shows API.

  // Remove the hard coded array from the searchShowsByTerm function and replace
  // the code with an AJAX request to the search shows api from TVMaze. Make sure
  // that the array of information you return from the function is formatted as
  //  described in the comments for the searchShowsByTerm function.

  const response = await fetch(`${TVMAZE_API_URL}search/shows?q=${term}`);
  const rawShows: Array<IShowAPI> = await response.json();
  //TODO: How to best handle defining type of data that is large and variable
  //TODO: Can you use map on a variable that is a Promise?
  const filteredShows = rawShows.map( //TODO: Be careful with naming of filteredShows and rawShows, this suggests getting rid of specific shows. Better name to describe diffs needed
    (show): IShow => {
      return {
        id: show.show.id,
        name: show.show.name,
        summary: show.show.summary,
        image: show.show.image.medium || MISSING_IMAGE_URL
      }
    }
  )
  return filteredShows;
}

/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */
//TODO: Throw the error! Don't handle here, let UI handle this. Don't have to
//specify Type of throw, but specify in doc string.

async function getEpisodesOfShow(id: number): Promise<Array<IEpisode> | String> {

  const response = await fetch(`${TVMAZE_API_URL}shows/${id}/episodes`);
  const rawEpisodes: Array<IEpisode> = await response.json();

  let filteredEpisdoes;

  try {
    filteredEpisdoes = rawEpisodes.map(
      (episode): IEpisode => {
        return {
          id: episode.id,
          name: episode.name,
          season: episode.season,
          number: episode.number
        }
      }
    )
  } catch(err: unknown) { //TODO: WHY any? Can also be unknown. This is nature of catch.
    if (err instanceof Error) return err.message;
  }

  return filteredEpisdoes;

}


export {
  searchShowsByTerm,
  getEpisodesOfShow,
  TVMAZE_API_URL,
  MISSING_IMAGE_URL,
};
