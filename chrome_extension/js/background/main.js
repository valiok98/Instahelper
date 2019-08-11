import { LoadingBars } from './components/loading-bars.js';
import { FilterTerms } from './components/filter-terms.js';
import { TermsLists } from './components/terms-lists.js';
import { Store } from './components/store/store.js';

export class Main {
    constructor() {
        this.store = new Store();
        window.store = this.store;
        this.loadingBars = new LoadingBars(this.store);
        this.filterTerms = new FilterTerms(this.store);
        this.termsLiss = new TermsLists(this.store);
    }
    /**
     * A function to render the user information and replace the loading bars.
     * @param {Object} userData - the object containing amount of followers, following, posts.
     */
    add_user_information_count(userData) {
        const parentElems = document.querySelectorAll('.data-count-item'),
            userImgElem = document.querySelector('.user-image');

        this.loadingBars.destroy_objects();

        // Add the retrieved data count.
        parentElems.forEach((parent, index) => {
            const newContainer = document.createElement('div');
            switch (index) {
                case 0:
                    newContainer.classList.add('post-count');
                    newContainer.textContent = userData.userPostCount;
                    break;
                case 1:
                    newContainer.classList.add('follower-count');
                    newContainer.textContent = userData.userFollowerCount;
                    break;
                case 2:
                    newContainer.classList.add('following-count');
                    newContainer.textContent = userData.userFollowingCount;
                    break;
            }
            parent.appendChild(newContainer);
            // Change the image.
        });
        userImgElem.href = `https://www.instagram.com/${userData.userName}/`;
        userImgElem.querySelector('img').src = userData.userProfilePicUrl;
    }
    /**
     * A function to 
     * @param {Object} userData - the object containing followers, following, posts.
     */
    add_user_information_tabs(userData) {

    }
}