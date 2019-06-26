export const LoadUserController = {
    get_user_id: payload => {
        if (payload.valid === true) {
            return fetch(`/js/api/get_user_id/${payload.inputHandle}`)
                .then(res => res.json())
                .then(res => Promise.resolve({ userIdData: res, ...payload }));
        }
        return Promise.resolve({ valid: false });
    },

    get_user_followers: payload => {
        if (payload.valid === true) {
            return fetch(`/js/api/get_followers/${payload.userId}`)
                .then(res => res.json())
                .then(res => Promise.resolve({ userFollowers: res, ...payload }));
        }
        return Promise.resolve({ valid: false });
    },

    get_user_following: payload => {
        if (payload.valid === true) {
            return fetch(`/js/api/get_following/${payload.userId}`)
                .then(res => res.json())
                .then(res => Promise.resolve({ userFollowing: res, ...payload }));
        }
        return Promise.resolve({ valid: false });
    },

    get_user_hashtags: payload => {
        if (payload.valid === true) {
            return fetch(`/js/api/get_hashtags/${payload.userId}`)
                .then(res => res.json())
                .then(res => Promise.resolve({ userHashtags: res, ...payload }));
        }
        return Promise.resolve({ valid: false });
    }

};