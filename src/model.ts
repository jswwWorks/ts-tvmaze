import { IShow, IEpisode } from './interfaces.ts';

const MISSING_IMAGE_URL = "https://tinyurl.com/missing-tv";
const TVMAZE_API_URL = "https://api.tvmaze.com/";


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function searchShowsByTerm(term: string): Promise<Array<IShow>> {
  // ADD: Remove placeholder & make request to TVMaze search shows API.

  // Remove the hard coded array from the searchShowsByTerm function and replace
  // the code with an AJAX request to the search shows api from TVMaze. Make sure
  // that the array of information you return from the function is formatted as
  //  described in the comments for the searchShowsByTerm function.

  const response = await fetch(`${TVMAZE_API_URL}search/shows?q=${term}`);
  const rawShows = await response.json();
  //TODO: How to best handle defining type of data that is large and variable
  //TODO: Can you use map on a variable that is a Promise?
  const filteredShows = rawShows.map(
    (show: any): IShow => {
      return {
        id: show.show.id,
        name: show.show.name,
        summary: show.show.summary,
        image: show.show.image.original || MISSING_IMAGE_URL
      }
    }
  )
  return filteredShows;
}

/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id: number): Promise<Array<IEpisode>> | Promise<String> {

  const response = await fetch(`${TVMAZE_API_URL}shows/${id}/episodes`);
  const rawEpisodes = await response.json();

  let filteredEpisdoes;

  try {
    filteredEpisdoes = rawEpisodes.map(
      (episode: any): IEpisode => {
        return {
          id: episode.id,
          name: episode.name,
          season: episode.season,
          number: episode.number
        }
      }
    )
  } catch(err) {
    return err.message;
  }

  return filteredEpisdoes;

}


export {
  searchShowsByTerm,
  getEpisodesOfShow,
  TVMAZE_API_URL,
  MISSING_IMAGE_URL,
};
