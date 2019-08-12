chrome.runtime.onMessage.addListener(async message => {
    if (message.action === 'get-user-info') {
        chrome.runtime.sendMessage({
            scriptFunction: 'get-user-info:initialUserData',
            userId: message.userId,
            userPostCount: message.userPostCount,
            userFollowerCount: message.userFollowerCount,
            userFollowingCount: message.userFollowingCount,
            userProfilePicUrl: message.userProfilePicUrl
        });
    }
});


