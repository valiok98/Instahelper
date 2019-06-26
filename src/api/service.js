const fetch = require('node-fetch');

const get_user_id = inputHandle => fetch(`https://www.instagram.com/${inputHandle}/?__a=1`)
    .then(res => res.json());

const get_followers = userId => fetch(`https://www.instagram.com/graphql/query/?query_hash=c76146de99bb02f6415203be841dd25a&variables={"id":"${userId}","include_reel":true,"fetch_mutual":true,"first":3}`, {
    headers: {
        cookie: 'sessionid=13355219131:cFojwKoAGlp8pV:29'
    }
}).then(res => res.json())
    .then(res => {
        console.log(res);
        
        return {
            count: res.data.user.edge_followed_by.count,
            edges: res.data.user.edge_followed_by.edges
        };
    });

const get_following = userId => fetch(`https://www.instagram.com/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables={"id":"${userId}","include_reel":true,"fetch_mutual":false,"first":24}`, {
    headers: {
        cookie: 'sessionid=13355219131:cFojwKoAGlp8pV:29'
    }
}).then(res => res.json())
    .then(res => {
        console.log(res);

        return {
            count: res.data.user.edge_follow.count,
            edges: res.data.user.edge_follow.edges
        };
    });

const get_hashtags = userId => fetch(`https://www.instagram.com/graphql/query/?query_hash=e6306cc3dbe69d6a82ef8b5f8654c50b&variables={"id":"${userId}"}`, {
    headers: {
        cookie: 'sessionid=13355219131:cFojwKoAGlp8pV:29'
    }
}).then(res => res.json())
    .then(res => {
        console.log(res);

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