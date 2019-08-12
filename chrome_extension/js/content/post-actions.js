import { get_recent_posts } from './get-recent-posts';
import {
    like,
    comment,
    follow,
    unfollow,
    like_feed_posts,
    like_comment_feed_posts,
    random_wait_time
} from './user-actions';

let tags = [],
    comments = [],
    locations = [];

chrome.runtime.onMessage.addListener(async message => {
    if (message.action === 'post-actions') {

        // let searchCriterium = message.tag ? tags : locations;

        if (message.recent) {
            await like_comment_feed_posts(comments);
        }

        if (message.like && message.comment && message.follow) {
            for (const tag of tags) {
                const recentPostsIds = await get_recent_posts(tag);
                for (const recentPostId of recentPostsIds) {
                    await random_wait_time(40000);
                    like(recentPostId[0]);
                    await random_wait_time(40000);
                    comment(recentPostId[0], comments[parseInt(Math.random() * comments.length)]);
                    await random_wait_time(40000);
                    follow(recentPostId[1]);
                }
            }
        }

        if (message.unfollow) {

        }

        // LIKE THE FEED POSTS.
        // Ideally run the following function twice a day, but it all depends
        // on the amount of people you follow.


        // LIKE POSTS FROM HASHTAGS.

    } else if (message.action === 'add-tag' && action.hasOwnProperty('tag')) {
        tags.push(message.tag);
    } else if (message.action === 'remove-tag' && action.hasOwnProperty('tag')) {
        tags = tags.reduce(tag => tag !== message.tag);
    } else if (message.action === 'add-comment' && action.hasOwnProperty('comment')) {
        comments.push(message.comment);
    } else if (message.action === 'remove-comment' && action.hasOwnProperty('comment')) {
        comments = comments.reduce(comment => comment !== message.comment);
    } else if (message.action === 'add-location' && action.hasOwnProperty('location')) {
        locations.push(message.location);
    } else if (message.action === 'remove-location' && action.hasOwnProperty('location')) {
        locations = locations.reduce(location => location !== message.location);
    }
});
