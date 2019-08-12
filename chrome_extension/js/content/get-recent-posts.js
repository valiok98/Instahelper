import { random_wait_time } from './user-actions';

export const get_recent_feed_posts = async () => {
    let feedPosts = [],
        batchCount = 20,
        feedPostCount = 25,
        url = `https://www.instagram.com/graphql/query/?query_hash=08574cc2c79c937fbb6da1c0972c7b39&variables={"cached_feed_item_ids":[],"fetch_media_item_count":${batchCount}}`;
    while (feedPostCount > 0) {
        const feedPostsResponse = await fetch(url)
            .then(res => res.json())
            .then(res => {
                const nodeIds = [];
                for (const node of res.data.user.edge_web_feed_timeline.edges) {
                    nodeIds.push([node.node.id, node.node.owner.id, node.node.shortcode]);
                    if (--feedPostCount === 0) {
                        feedPostCount = -1;
                        break;
                    }
                }
                return {
                    edges: nodeIds,
                    endCursor: res.data.user.edge_web_feed_timeline.page_info.end_cursor
                };
            })
            .catch(err => {
                feedPostCount = -1;
                return {
                    edges: []
                };
            });
        await random_wait_time();
        feedPosts = [...feedPosts, ...feedPostsResponse.edges];
        url = `https://www.instagram.com/graphql/query/?query_hash=08574cc2c79c937fbb6da1c0972c7b39&variables={"cached_feed_item_ids":[],"fetch_media_item_count":${batchCount},"fetch_media_item_cursor":"${feedPostsResponse.endCursor}"}`;
    }
    return feedPosts;
};

export const get_recent_posts = async hashtag => {
    let hashtagPosts = [],
        batchCount = 20,
        hashtagPostCount = 10,
        url = `https://www.instagram.com/graphql/query/?query_hash=f92f56d47dc7a55b606908374b43a314&variables={"tag_name":"${hashtag}","first":${batchCount}}`;
    while (hashtagPostCount > 0) {
        const hashtagPostsResponse = await fetch(url)
            .then(res => res.json())
            .then(res => {
                const nodeIds = [];
                for (const node of res.data.hashtag.edge_hashtag_to_media.edges) {
                    nodeIds.push([node.node.id, node.node.owner.id, node.node.shortcode]);
                    if (--hashtagPostCount === 0) {
                        hashtagPostCount = -1;
                        break;
                    }
                }
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
        url = `https://www.instagram.com/graphql/query/?query_hash=f92f56d47dc7a55b606908374b43a314&variables={"tag_name":"${hashtag}","first":${batchCount},"after":"${hashtagPostsResponse.endCursor}"}`;
    }
    return hashtagPosts;
}