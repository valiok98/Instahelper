/**
 * This iffy should redirect to the user's main page.
 * It should run outside load event listener, since index called this page.
 * We redirect to extract the number of
 * posts
 * followers
 * following - (people & hashtags)
 * Note: we extract the data for the last two via DOM manipulation.
 * The current Instagram API does not allow it.
 * Failed attempts at reverse-engeneering the API are in the repository.
 */

(() => {
    const profileLink = document.querySelectorAll('.XrOey>a')[2];
    profileLink.click();
})();

import * as getUserInfo from './get-user-info';
import * as postUserInfo from './post-user-actions';
