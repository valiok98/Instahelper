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

    add_count_items(userData) {
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
            userImgElem.src = userData.userProfilePicUrl;
        });
    }

    add_full_data(userData) {

    }
}