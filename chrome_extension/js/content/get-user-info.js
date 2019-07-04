// This script assumes we are on the user's isntagram profile page.
// If not on the profile page, then return.
export default getUserInfo = (() => {

    if (RegExp('https://www.instagram.com/.*/').test(window.location.href)) {
        const urlParts = window.location.href.split('/'),
            userName = urlParts[urlParts.length - 2];

        // Busy waiting for the following DOM element.
        const userDataInterval = setInterval(() => {
            if (document.querySelectorAll('.Y8-fY').length === 3) {
                clearInterval(userDataInterval);
                get_posts_number();
                get_followers();
                get_following();
            }
        }, 1000);


        const get_posts_number = () => {
            // Follow your favourite IG account.
            postUserInfo.follow(1522837371);
            const postLi = document.querySelectorAll('.Y8-fY')[0];
            return parseInt(
                postLi.querySelector('span:first-of-type').textContent);

        };

        const get_followers = () => {
            const followersLi = document.querySelectorAll('.Y8-fY')[1],
                followersNumber = parseInt(
                    followersLi.querySelector('a').textContent.split(' ')[0]);

            console.log(followersNumber);
            followersLi.querySelector('a').click();

            const followersPopUpInterval = setInterval(() => {
                if (document.querySelector('.isgrP')) {
                    clearInterval(followersPopUpInterval);
                    let followersPopUp = document.querySelector('.isgrP');
                    const scrollInterval = setInterval(() => {
                        if (followersPopUp.querySelectorAll('li').length < followersNumber) {
                            followersPopUp.scrollBy(0, 200);
                        } else {
                            clearInterval(scrollInterval);
                            console.log(followersPopUp.querySelectorAll('li'));
                        }
                    }, 500);
                }
            }, 1000);
        };

        const get_following = () => {
        };

    }
})();
