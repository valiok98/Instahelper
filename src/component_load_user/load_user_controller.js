export const LoadUserController = {
    get_user_id: payload => {
        if (payload.valid === true) {
            return fetch(`/js/api/get_user_id/${payload.inputHandle}`)
                .then(res => res.json())
                .then(res => Promise.resolve({ ...res, userName: inputHandle, valid: true }));
        }
        return Promise.resolve({ valid: false });
    },

    get_user_followers: payload => {
        if (payload.valid === true) {
            return fetch(`/js/api/get_followers/${payload.userId}`)
                .then(res => res.json())
                .then(res => Promise.resolve({
                    ...res, userName: payload.userName, userId: payload.userId,
                    valid: true
                }));
        }
        return Promise.resolve({ valid: false });
    },

    get_user_following: payload => {
        if (payload.valid === true) {
            return fetch(`/js/api/get_following/${payload.userId}`)
                .then(res => res.json())
                .then(res => Promise.resolve({
                    ...res,
                    userName: payload.userName, userId: payload.userId,
                    valid: true
                }));
        }
        return Promise.resolve({ valid: false });
    },

    get_user_hashtags: payload => {
        if (payload.valid === true) {
            return fetch(`/js/api/get_hashtags/${payload.userId}`)
                .then(res => res.json())
                .then(res => Promise.resolve({
                    ...res,
                    userName: payload.userName, userId: payload.userId,
                    valid: true
                }));
        }
        return Promise.resolve({ valid: false });
    }

};