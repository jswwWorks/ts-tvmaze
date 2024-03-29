import $ from 'jquery';
import { getEpisodesOfShow, searchShowsByTerm } from "./model.ts";
import { IShow, IEpisode } from './interfaces.ts';

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");


/** Given list of shows, create markup for each and add to DOM
 * shows is array like [{id, name, summary, image}, ...]
*/

function populateShows(shows: Array<IShow>): void {
  $showsList.empty();

  for (const show of shows) {
    const x = show.image;

    const $show = $(
      `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img
              src=${x}
              alt="Image of ${show.name}"
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
       </div>
      `
    );

    $showsList.append($show);
  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
*/

async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await searchShowsByTerm(term as string);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given a list of episodes create markup for each and adds to DOM in the
 * episodesArea
 * episodes is array like [{id, name, season, number}, ...]
*/

function populateEpisodes(episodes: (IEpisode[] | String)): void {
  $episodesArea.empty();

  if(typeof episodes === "string") {

    const $messageDisplay = (`<div><p>${episodes}</p></div>`);
    $episodesArea.append($messageDisplay);

  } else if(Array.isArray(episodes)) {

    const $episodeList = $("<ul>");

    for (const episode of episodes) {
      const $episode = $(
        `<li id=${episode.id}>
        ${episode.name} (season ${episode.season}, number ${episode.number})
        </li>`
      );

      $episodeList.append($episode);
    }

    $episodesArea.append($episodeList);
  }

  $episodesArea.show();
}



/**
 *  Handles clicks on an episode button of a show. Calls getEpisodesOfShow
 *  to get data about a show's episodes and calls populateEpisodes to put
 *  that information into the DOM.
 *
 */



// get all buttons from showslist
// FIXME: issue b/c this doesn't happen on a future reload
// put an event listener on showsList and put target for event on a button
$(".Show-getEpisodes").on("click", async function (evt) {
  evt.preventDefault();

  const $showDiv = $(evt.target).closest("data-show-id")
  const showId: number = $showDiv.data("showId");

  let episodes;

  try {
    episodes = await getEpisodesOfShow(showId);
  } catch(error: unknown) {
    if (error instanceof Error) {
      episodes = error.message; // error.message should be "No episodes found."
    }
    // otherwise, there was still some sor of issue...
    episodes = "Sorry, there was a problem with this request.";
  }

  populateEpisodes(episodes);
});
