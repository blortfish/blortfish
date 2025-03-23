import {useQuery} from '@apollo/client';
import {GET_POSTS} from '../graphql/queries';
import {LegacyUsers} from "../../legacy-data/LegacyUsers";


interface Post {
    service: string;
    servicePostId: string;
    postedBy: string;
    datePosted: string;
    tags: string[];
}

export function PostList() {
    const {loading, error, data} = useQuery(GET_POSTS);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const getThumbnailUrl = (post: Post) => {
        switch (post.service.toLowerCase()) {
            case 'yt':
                // YouTube thumbnail
                return `https://img.youtube.com/vi/${post.servicePostId}/mqdefault.jpg`;
            case 'sc':
                // SoundCloud doesn't have a direct thumbnail API, would need to use their API
                return 'https://placekitten.com/300/200'; // Placeholder
            case 'vm':
                // Vimeo needs API access for thumbnails
                return 'https://placekitten.com/300/200'; // Placeholder
            default:
                return 'https://placekitten.com/300/200'; // Default placeholder
        }
    };

    const getVideoUrl = (post: Post) => {
        switch (post.service.toLowerCase()) {
            case 'yt':
                return `https://www.youtube.com/watch?v=${post.servicePostId}`;
            case 'sc':
                return `https://soundcloud.com/${post.servicePostId}`;
            case 'vm':
                return `https://vimeo.com/${post.servicePostId}`;
            default:
                return '#';
        }
    };
    return (
        <div className="post-list">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.posts.map((post: Post, index: number) => (
                    <div key={index}
                         className="border dark:border-dark-700 rounded-lg p-4 shadow-sm dark:bg-dark-800 transition-transform hover:scale-102 hover:shadow-md">
                        <a href={getVideoUrl(post)} target="_blank" rel="noopener noreferrer"
                           className="block overflow-hidden rounded">
                            <img
                                src={getThumbnailUrl(post)}
                                alt={`${post.service} content by ${LegacyUsers[post.postedBy]?.displayName}`}
                                className="w-full h-auto object-cover mb-2 transition-transform hover:scale-105"
                            />
                        </a>
                        <div className="mt-3">
              <span className="bg-gray-700 text-gray-200 px-2 py-1 rounded text-xs uppercase font-medium">
                {post.service}
              </span>
                            <span className="ml-2 text-sm dark:text-gray-400">
                by {LegacyUsers[post.postedBy]?.displayName} on {new Date(post.datePosted).toLocaleDateString()}
              </span>
                        </div>
                        {post.tags && post.tags.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1">
                                {post.tags.map((tag, idx) => (
                                    <span key={idx} className="bg-indigo-900 text-indigo-100 text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PostList;
