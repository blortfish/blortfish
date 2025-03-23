import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../graphql/queries';

interface Post {
  service: string;
  servicePostId: string;
  postedBy: string;
  datePosted: string;
  tags: string[];
}

export function PostList() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="post-list">
      <h2>Posts</h2>
      <ul>
        {data.posts.map((post: Post, index: number) => (
          <li key={index}>
            <strong>Service:</strong> {post.service} | <strong>ID:</strong> {post.servicePostId}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
