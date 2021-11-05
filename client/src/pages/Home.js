import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Grid } from "semantic-ui-react";

import SinglePost from "../components/SinglePost";

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  if (loading) {
    return <h1>Posts are loading</h1>;
  } else {
    const posts = data.getPosts;
    if (posts) {
      return (
        <Grid columns={3}>
          <Grid.Row className="page-title">
            <h1>Recent Questions</h1>
          </Grid.Row>
          <Grid.Row>
            {loading ? (
              <h1>loading posts...</h1>
            ) : (
              posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <SinglePost post={post} />
                </Grid.Column>
              ))
            )}
          </Grid.Row>
        </Grid>
      );
    }
  }
};

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default Home;
