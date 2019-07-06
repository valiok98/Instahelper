import { follow, like, get_cookie } from './post-user-actions';

chrome.runtime.onMessage.addListener(async message => {

    const userInfo = await Promise.all([
        get_followers(message.userId, message.userFollowerCount),
        get_following(message.userId, message.userFollowingCount)
    ]);

    const userFollowers = userInfo[0];
    const userFollowing = userInfo[1];

    chrome.runtime.sendMessage({
        script: 'get-user-info',
        userId: message.userId,
        userBio: message.userBio,
        userPostCount: message.userPostCount,
        userFollowerCount: message.userFollowerCount,
        userFollowingCount: message.userFollowingCount,
        userProfilePicUrl: message.userProfilePicUrl,
        userFollowers,
        userFollowing
    });

});


const get_followers = async (userId, userFollowerCount) => {
    let userFollowers = [],
        batchCount = 20,
        actuallyFetched = 20,
        url = `https://www.instagram.com/graphql/query/?query_hash=c76146de99bb02f6415203be841dd25a&variables={"id":"${userId}","include_reel":true,"fetch_mutual":true,"first":"${batchCount}"}`;
    while (userFollowerCount > 0) {
        const followersResponse = await fetch(url)
            .then(res => res.json())
            .then(res => {
                const nodeIds = [];
                for (const node of res.data.user.edge_followed_by.edges) {
                    nodeIds.push(node.node.id);
                }
                actuallyFetched = nodeIds.length;
                return {
                    edges: nodeIds,
                    endCursor: res.data.user.edge_followed_by.page_info.end_cursor
                };
            }).catch(err => {
                userFollowerCount = -1;
                return {
                    edges: []
                };
            });
        await random_wait_time();
        userFollowers = [...userFollowers, ...followersResponse.edges];
        userFollowerCount -= actuallyFetched;
        url = `https://www.instagram.com/graphql/query/?query_hash=c76146de99bb02f6415203be841dd25a&variables={"id":"${userId}","include_reel":true,"fetch_mutual":true,"first":${batchCount},"after":"${followersResponse.endCursor}"}`;
    }
    return userFollowers;
};

const get_following = async (userId, userFollowingCount) => {
    let userFollowing = [],
        batchCount = 20,
        actuallyFetched = 20,
        url = `https://www.instagram.com/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables={"id":"${userId}","include_reel":true,"fetch_mutual":true,"first":"${batchCount}"}`;
    while (userFollowingCount > 0) {
        const followersResponse = await fetch(url)
            .then(res => res.json())
            .then(res => {
                const nodeIds = [];
                for (const node of res.data.user.edge_follow.edges) {
                    nodeIds.push(node.node.id);
                }
                actuallyFetched = nodeIds.length;
                return {
                    edges: nodeIds,
                    endCursor: res.data.user.edge_follow.page_info.end_cursor
                };
            }).catch(err => {
                userFollowingCount = -1;
                return {
                    edges: []
                };
            });
        await random_wait_time();
        userFollowing = [...userFollowing, ...followersResponse.edges];
        userFollowingCount -= batchCount;
        url = `https://www.instagram.com/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables={"id":"${userId}","include_reel":true,"fetch_mutual":true,"first":${batchCount},"after":"${followersResponse.endCursor}"}`;
    }
    return userFollowing;
};

const random_wait_time = (waitTime = 300) => new Promise((resolve, reject) => {
    setTimeout(() => {
        return resolve();
    }, Math.random() * waitTime);
});

