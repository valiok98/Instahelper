import { get_recent_posts } from './get-recent-posts';
import { comment, random_wait_time } from './post-user-actions';

chrome.runtime.onMessage.addListener(async message => {
    if (message.scriptName === 'post-comments') {

        const tagNames = [
            'art'
        ];

        const comments = [
            'I make similiar stuff, you can check it out ! 🥰',
            'Love the pic so much <3',
            'My pics are not as good as yours ;(',
            'Hey, let\'s be friends !'
        ];

        for (const tag of tagNames) {
            console.log('fetching for ' + tag);
            const postIds = await get_recent_posts(tag);
            for (const postId of postIds) {
                console.log('Commenting post ' + postId[0] + ' ' + postId[1] + ' ' + postId[2]);
                await random_wait_time(40000);
                comment(postId[0], comments[parseInt(Math.random() * 3)]);
            }
        }

    }
});