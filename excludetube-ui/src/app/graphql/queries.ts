import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      service
      servicePostId
      postedBy
      datePosted
      tags
    }
  }
`;
