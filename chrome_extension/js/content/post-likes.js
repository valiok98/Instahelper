import { get_recent_posts } from './get-recent-posts';
import { like, random_wait_time } from './post-user-actions';

chrome.runtime.onMessage.addListener(async message => {
    if (message.scriptName === 'post-likes') {

        const tagNames = [
            'art',
            'artist',
            'artwork',
            'artistsofinstagram',
            'artistsoninstagram'
        ];


        for (const tag of tagNames) {
            console.log('fetching for ' + tag);
            const postIds = await get_recent_posts(tag);
            for (const postId of postIds) {
                console.log('Liking post ' + postId[0] + ' ' + postId[1] + ' ' + postId[2]);
                await random_wait_time(40000);
                like(postId[0]);
            }
        }

    }
});