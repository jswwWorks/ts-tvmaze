import IShow from "./interfaces";

const MISSING_IMAGE_URL = "https://tinyurl.com/missing-tv";
const TVMAZE_API_URL = "https://api.tvmaze.com/";


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function searchShowsByTerm(term: string): Promise<array> {
  // ADD: Remove placeholder & make request to TVMaze search shows API.

  // Remove the hard coded array from the searchShowsByTerm function and replace
  // the code with an AJAX request to the search shows api from TVMaze. Make sure
  // that the array of information you return from the function is formatted as
  //  described in the comments for the searchShowsByTerm function.

  // const options = {
  //   header
  // }


  const response = await fetch(`${TVMAZE_API_URL}search/shows?q=${term}`);
  const rawShows = await response.json();

  const filteredShows = rawShows.map((show: IShow) => {
    id: show.show.id,
    name: show.show.name,
    summary: show.show.summary,
    image: show.show.image.original || MISSING_IMAGE_URL
  })




  // will return array


}
// return [
//   {
//     id: 1767,
//     name: "The Bletchley Circle",
//     summary:
//       `<p><b>The Bletchley Circle</b> follows the journey of four ordinary
//          women with extraordinary skills that helped to end World War II.</p>
//        <p>Set in 1952, Susan, Millie, Lucy and Jean have returned to their
//          normal lives, modestly setting aside the part they played in
//          producing crucial intelligence, which helped the Allies to victory
//          and shortened the war. When Susan discovers a hidden code behind an
//          unsolved murder she is met by skepticism from the police. She
//          quickly realises she can only begin to crack the murders and bring
//          the culprit to justice with her former friends.</p>`,
//     image:
//       "http://static.tvmaze.com/uploads/images/medium_portrait/147/369403.jpg"
//   }
// ]


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) {
}


export {
  searchShowsByTerm,
  getEpisodesOfShow,
  TVMAZE_API_URL,
  MISSING_IMAGE_URL,
};
