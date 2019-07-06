export const get_cookie = name => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const cookieName = cookie.substring(0, cookie.indexOf('=')).trim(),
            cookieValue = cookie.substring(cookie.indexOf('=') + 1).trim();
        if (cookieName === name) {
            return cookieValue;
        }
    }
};

export const random_wait_time = (waitTime = 300) => new Promise((resolve, reject) => {
    setTimeout(() => {
        return resolve();
    }, Math.random() * waitTime);
});


export const follow = instagramId => {
    // Compare whether we are following a normal user or a hashtag.
    if (isNaN(instagramId)) {
        fetch(`https://www.instagram.com/web/tags/follow/${instagramId}/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-csrftoken': get_cookie('csrftoken'),
                'x-requested-with': 'XMLHttpRequest'
            }
        })
            .then(res => res.json())
            .then(res => console.log(res));
    } else {
        fetch(`https://www.instagram.com/web/friendships/${instagramId}/follow/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-csrftoken': get_cookie('csrftoken')
            }
        })
    }
};

export const like = postId => {
    fetch(`https://www.instagram.com/web/likes/${postId}/like/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-csrftoken': get_cookie('csrftoken')
        }
    })
};