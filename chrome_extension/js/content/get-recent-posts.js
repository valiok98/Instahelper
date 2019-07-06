import {random_wait_time} from './post-user-actions';

export const get_recent_posts = async hashtag => {
    let hashtagPosts = [],
    batchCount = 20,
    actuallyFetched = 20,
    hashtagPostCount = 100,
    url = `https://www.instagram.com/graphql/query/?query_hash=f92f56d47dc7a55b606908374b43a314&variables={"tag_name":"${hashtag}","first":${batchCount}}`;
while (hashtagPostCount > 0) {
    const hashtagPostsResponse = await fetch(url)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            const nodeIds = [];
            for (const node of res.data.hashtag.edge_hashtag_to_media.edges) {
                nodeIds.push([node.node.id, node.node.owner.id]);
            }
            actuallyFetched = nodeIds.length;
            return {
                edges: nodeIds,
                endCursor: res.data.hashtag.edge_hashtag_to_media.page_info.end_cursor
            };
        }).catch(err => {
            hashtagPostCount = -1;
            return {
                edges: []
            };
        });
    await random_wait_time();
    hashtagPosts = [...hashtagPosts, ...hashtagPostsResponse.edges];
    hashtagPostCount -= actuallyFetched;
    url = `https://www.instagram.com/graphql/query/?query_hash=f92f56d47dc7a55b606908374b43a314&variables={"tag_name":"${hashtag}","first":${batchCount},"after":"${hashtagPostsResponse.endCursor}"}`;
}
return hashtagPosts;
}