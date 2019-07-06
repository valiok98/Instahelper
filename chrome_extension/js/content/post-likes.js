import { get_recent_posts } from './get-recent-posts';
import { like , random_wait_time} from './post-user-actions';

chrome.runtime.onMessage.addListener(async message => {

    const postIds = await get_recent_posts(message.hashtagName);
    for (const postId of postIds) {
        console.log('Liking post ' + postId[0] + ' ' + postId[1]);
        await random_wait_time(10000);
        like(postId[0]);
    }
});