const fetch = require('node-fetch');

const followersUrl = 'https://www.instagram.com/graphql/query/?query_hash=c76146de99bb02f6415203be841dd25a&variables={"id":"7190489473","include_reel":true,"fetch_mutual":true,"first":3}';

// const followersUrl = 'https://www.instagram.com/graphql/query/?query_hash=c76146de99bb02f6415203be841dd25a&variables={"id":"7190489473","include_reel":true,"fetch_mutual":true,"first":24}';

const followingUrl = 'https://www.instagram.com/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables={"id":"13355219131","include_reel":true,"fetch_mutual":false,"first":24}';

const hashtagsUrl = 'https://www.instagram.com/graphql/query/?query_hash=e6306cc3dbe69d6a82ef8b5f8654c50b&variables={"id":"13355219131"}';



const get_user_id = inputHandle => fetch(`https://www.instagram.com/${inputHandle}/?__a=1`)
    .then(res => res.json());

const get_followers = () => fetch(followersUrl, {
    headers: {
        cookie: 'sessionid=13355219131:cFojwKoAGlp8pV:29'
    }
}).then(res => res.json())
    .then(res => {
        return {
            count: res.data.user.edge_followed_by.count,
            edges: res.data.user.edge_followed_by.edges
        };
    });

const get_following = () => fetch(followingUrl, {
    headers: {
        cookie: 'sessionid=13355219131:cFojwKoAGlp8pV:29'
    }
}).then(res => res.json())
    .then(res => {
        return {
            count: res.data.user.edge_follow.count,
            edges: res.data.user.edge_follow.edges
        };
    });

const get_hashtags = () => fetch(hashtagsUrl, {
    headers: {
        cookie: 'sessionid=13355219131:cFojwKoAGlp8pV:29'
    }
}).then(res => res.json())
    .then(res => {
        return {
            count: res.data.user.edge_following_hashtag.count,
            edges: res.data.user.edge_following_hashtag.edges
        };
    });



module.exports = {
    get_user_id,
    get_followers,
    get_following,
    get_hashtags
};