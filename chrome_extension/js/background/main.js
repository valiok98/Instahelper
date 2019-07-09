export class Main {
    constructor() {
        this.loadingElems = [];

        this.add_loading_bars();
    }

    add_loading_bars() {
        for (let elem of document.querySelectorAll('.mdc-linear-progress')) {
            this.loadingElems.push(mdc.linearProgress.MDCLinearProgress.attachTo(elem));

        }
    }
    /**
     * A function to render the user information and replace the loading bars.
     * @param {Object} userData - the object containing amount of followers, following, posts.
     */
    add_user_information_count(userData) {
        const parentElems = document.querySelectorAll('.data-count-item'),
            userImgElem = document.querySelector('.user-image');
        // Remove the loading bars.
        for (const elem of this.loadingElems) {
            elem.close()
            elem.root_.remove();
        }
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
        userImgElem.src = userData.userProfilePicUrl;
    }
    /**
     * A function to 
     * @param {Object} userData - the object containing followers, following, posts.
     */
    add_user_information_tabs(userData) {
        
    }
}