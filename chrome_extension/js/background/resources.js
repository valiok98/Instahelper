export const res = (() => {

    let extensionId;
    const instagramRegex = RegExp(`www\.instagram\.com`);
    const instagramUrls = [
        'https://www.instagram.com/',
        'https://www.instagram.com/*/'
    ];
    const setExtensionId = _extensionId => {
        extensionId = _extensionId;
    };
    const getIndexUrl = () => {
        return `chrome-extension://${extensionId}/html/index.html`;
    };

    const get_user_information = userId => fetch(`https://i.instagram.com/api/v1/users/${userId}/info/`)
        .then(res => res.json())
        .then(res => ({
            userName: res.user.username,
            userBio: res.user.biography,
            userPostCount: res.user.media_count,
            userFollowerCount: res.user.follower_count,
            userFollowingCount: res.user.following_count,
            userProfilePicUrl: res.user.hd_profile_pic_url_info.url
        }))
        .catch(err => console.error(err));

    return {
        instagramRegex,
        instagramUrls,
        setExtensionId,
        getIndexUrl,
        get_user_information
    };
})();