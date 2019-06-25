export const LoadUserController = {
    get_user_id: payload => {
        if (payload.valid === true) {
            return fetch(`/js/api/get_user_id/${payload.inputHandle}`)
                .then(res => res.json())
                .then(res => Promise.resolve({ ...res, valid: true }));
        }
        return Promise.resolve({ valid: false });
    }
};