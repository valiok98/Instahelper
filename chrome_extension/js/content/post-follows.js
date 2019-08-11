import { get_recent_posts } from './get-recent-posts';
import { follow, random_wait_time } from './post-user-actions';

chrome.runtime.onMessage.addListener(async message => {
    if (message.scriptName === 'post-follows') {

        const tagNames = [
            'fashion',
            'women',
            'clothing',
            'womenclothing',
            'clothes'
        ];

        // FOLLOW POSTS FROM HASHTAGS.
        for (let _ = 0; _ < 5; _++) {
            for (const tag of tagNames) {
                const hashtagPostIds = await get_recent_posts(tag);
                console.log(`fetching for ${tag}`);
                for (const hashtagPostId of hashtagPostIds) {
                    console.log(`following user with post : ${hashtagPostId[2]}`);
                    await random_wait_time(40000);
                    follow(hashtagPostId[1]);
                }
            }
        }
    }
});