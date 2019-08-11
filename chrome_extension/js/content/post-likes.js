import { get_recent_feed_posts, get_recent_posts } from './get-recent-posts';
import { like, random_wait_time } from './post-user-actions';

chrome.runtime.onMessage.addListener(async message => {
    if (message.scriptName === 'post-likes') {

        const tagNames = [
            'fashion',
            'women',
            'clothing',
            'womenclothing',
            'clothes'
        ];

        // LIKE THE FEED POSTS.
        // Ideally run the following function twice a day, but it all depends
        // on the amount of people you follow.

        // await like_feed_posts();

        // LIKE POSTS FROM HASHTAGS.
        for (let _ = 0; _ < 5; _++) {
            for (const tag of tagNames) {
                console.log('fetching for ' + tag);
                const hashtagPostIds = await get_recent_posts(tag);
                for (const hashtagPostId of hashtagPostIds) {
                    console.log('Liking post ' + hashtagPostId[0] + ' ' + hashtagPostId[1] + ' ' + hashtagPostId[2]);
                    await random_wait_time(40000);
                    like(hashtagPostId[0]);
                }
            }
        }
    }
});

const like_feed_posts = async () => {
    const feedPostIds = await get_recent_feed_posts();
    for(const feedPostId of feedPostIds) {
        await random_wait_time(40000);
        like(feedPostId[0]);
    }
    return Promise.resolve();
};