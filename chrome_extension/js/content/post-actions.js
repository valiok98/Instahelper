import { get_recent_posts, get_recent_feed_posts } from './get-recent-posts';
import {
    like,
    comment,
    follow,
    unfollow,
    random_wait_time
} from './user-actions';

let tags = [
    // 'womenfashion',
    // 'womenclothing',
    // 'womenclothes',
    // 'women',
    // 'woman'
    'art',
    'painting',
    'artwork',
    'artist',
    'artistsofinstagram',
    'artsy',
    'love'
],
    comments = [
        'nice ;)',
        'What can I do for you to check my David Dobrik mural <3 ?',
        'We love art ;)',
        'Art is life',
        'No matter what, art always brightens my day! <3'
        // 'cool outfit <3',
        // 'we love fashion ! Do you ? <3',
        // 'crazy quality, fashion rocks !'
    ],
    locations = [],
    neverUnfollow = [
        'erikamerlo_'
    ];

chrome.runtime.onMessage.addListener(async message => {
    if (message.action === 'post-actions') {
        // let searchCriterium = message.tag ? tags : locations;

        // if (message.recent) {
        //     await like_comment_feed_posts(comments);
        //     console.log('liking/commenting recent post');
        // }

        // if (message.unfollow && message.userId) {
        //     console.log(message.userId);
        //     const following = await get_following(message.userId, 50);
        //     for (const person of following) {
        //         // Check if we shouldn't unfollow the user.
        //         if (!neverUnfollow.some(p => p === person[1])) {
        //             console.log('unfollowing');
        //             await random_wait_time(40000);
        //             unfollow(person[0]);
        //         }
        //     }
        // }

        if (message.like && message.comment && message.follow) {
            // const followers = await get_followers(561631450, 50);
            for (const tag of tags) {
                const data = await get_recent_posts(tag, 50);
                for (const datum of data) {
                    console.log(datum);
                    like(datum[0]);
                    await random_wait_time(40000);
                    if (comments.length) {
                        comment(datum[0], comments[Math.floor(Math.random() * (comments.length - 1))]);
                        await random_wait_time(40000);
                    }
                    follow(datum[1]);
                    await random_wait_time(40000);
                    console.log('liked, commented, followed');
                }
            }
        }


    } else if (message.action === 'add-tag' && message.hasOwnProperty('tag')) {
        tags.push(message.tag);
    } else if (message.action === 'remove-tag' && message.hasOwnProperty('tag')) {
        tags = tags.reduce(tag => tag !== message.tag);
    } else if (message.action === 'add-comment' && message.hasOwnProperty('comment')) {
        comments.push(message.comment);
    } else if (message.action === 'remove-comment' && message.hasOwnProperty('comment')) {
        comments = comments.reduce(comment => comment !== message.comment);
    } else if (message.action === 'add-location' && message.hasOwnProperty('location')) {
        locations.push(message.location);
    } else if (message.action === 'remove-location' && message.hasOwnProperty('location')) {
        locations = locations.reduce(location => location !== message.location);
    }
});


const like_feed_posts = async () => {
    const feedPostIds = await get_recent_feed_posts();
    for (const feedPostId of feedPostIds) {
        await random_wait_time(40000);
        like(feedPostId[0]);
    }
    return Promise.resolve();
};

const comment_feed_posts = async comments => {
    if (comments.length !== 0) {
        const feedPostIds = await get_recent_feed_posts();
        for (const feedPostId of feedPostIds) {
            await random_wait_time(40000);
            comment(feedPostId[0], comments[parseInt(Math.random() * comments.length)]);
        }
    }
    return Promise.resolve();
};

const like_comment_feed_posts = async comments => {
    const feedPostIds = await get_recent_feed_posts();

    for (const feedPostId of feedPostIds) {
        console.log('liked');
        await random_wait_time(40000);
        like(feedPostId[0]);
        if (comments.length !== 0) {
            console.log('commented');
            await random_wait_time(40000);
            comment(feedPostId[0], comments[parseInt(Math.random() * comments.length)]);
        }

    }
    return Promise.resolve();
};

export const get_followers = async (userId, userFollowerCount) => {
    let userFollowers = [],
        batchCount = 20,
        actuallyFetched = 20,
        url = `https://www.instagram.com/graphql/query/?query_hash=c76146de99bb02f6415203be841dd25a&variables={"id":"${userId}","include_reel":true,"fetch_mutual":true,"first":"${batchCount}"}`;
    while (userFollowerCount > 0) {
        const followersResponse = await fetch(url)
            .then(res => res.json())
            .then(res => {
                const nodes = [];
                for (const node of res.data.user.edge_followed_by.edges) {
                    nodes.push([node.node.id, node.node.username]);
                }
                actuallyFetched = nodes.length;
                return {
                    edges: nodes,
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

export const get_following = async (userId, userFollowingCount) => {
    let userFollowing = [],
        batchCount = 20,
        actuallyFetched = 20,
        url = `https://www.instagram.com/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables={"id":"${userId}","include_reel":true,"fetch_mutual":true,"first":"${batchCount}"}`;
    while (userFollowingCount > 0) {
        const followersResponse = await fetch(url)
            .then(res => res.json())
            .then(res => {
                const nodes = [];
                for (const node of res.data.user.edge_follow.edges) {
                    nodes.push([node.node.id, node.node.username]);
                }
                actuallyFetched = nodes.length;
                return {
                    edges: nodes,
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