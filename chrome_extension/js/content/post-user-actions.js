export default postUserActions = (() => {
    const follow = instagramId => {
        // Compare whether we are following a normal user or a hashtag.
        if (isNaN(instagramId)) {
            fetch(`https://www.instagram.com/web/tags/follow/${instagramId}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(res => res.json())
                .then(res => console.log(res));
        } else {
            fetch(`https://www.instagram.com/web/friendships/${instagramId}/follow/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        }
    };

    const like = postId => {
        fetch(`https://www.instagram.com/web/likes/${postId}/like/`, {
            method: 'POST'
        })
    };

})();
