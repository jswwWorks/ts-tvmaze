import { IShow, IEpisode, IScoreAndShow } from './interfaces.ts';

const MISSING_IMAGE_URL = "https://tinyurl.com/missing-tv";
const TVMAZE_API_URL = "https://api.tvmaze.com/";


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

// Note: this line would also be a fine function signature (just w/o the
// syntactic sugar):
// async function searchShowsByTerm(term: string): Promise<Array<IShow>> {}

async function searchShowsByTerm(term: string): Promise<IShow[]> {

  const response = await fetch(`${TVMAZE_API_URL}search/shows?q=${term}`);
  const showsExpandedData: Array<IScoreAndShow> = await response.json();

  const showsCondensedData = showsExpandedData.map(
    (show): IShow => {
      return {
        id: show.show.id,
        name: show.show.name,
        summary: show.show.summary,
        image: show.show.image.medium || MISSING_IMAGE_URL
      }
    }
  )
  return showsCondensedData;
}

/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */
//TODO: Throw the error! Don't handle here, let UI handle this. Don't have to
//specify Type of throw, but specify in doc string.

async function getEpisodesOfShow(id: number): Promise<IEpisode[]> {

  const response = await fetch(`${TVMAZE_API_URL}shows/${id}/episodes`);
  const episodesExpandedData: IEpisode[] | Error = await response.json();

  if (episodesExpandedData instanceof Error) {
    throw new Error("No episodes found.");
  }

  const episodesCondensedData = episodesExpandedData.map(
    (episode): IEpisode => {
      return {
        id: episode.id,
        name: episode.name,
        season: episode.season,
        number: episode.number
      }
    }
  )

  return episodesCondensedData;
}


export {
  searchShowsByTerm,
  getEpisodesOfShow,
  TVMAZE_API_URL,
  MISSING_IMAGE_URL,
};
