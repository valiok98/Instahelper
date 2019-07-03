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

window.addEventListener('load', e => {

    const postLi = document.querySelectorAll('.Y8-fY')[0],
        followersLi = document.querySelectorAll('.Y8-fY')[1],
        followingLi = document.querySelectorAll('.Y8-fY')[2];

    console.log(postLi, followersLi, followingLi);

    const numberPosts = parseInt(
        postLi.querySelector('span:first-of-type').textContent);

    console.log(numberPosts);
});

