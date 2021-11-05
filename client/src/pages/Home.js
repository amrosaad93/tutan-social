import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import SinglePost from "../components/SinglePost";
import NewPostForm from "../components/NewPostForm";
import { FETCH_POSTS_QUERY } from "../util/graphql";

const Home = () => {
  const { user } = useContext(AuthContext);
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
            {user && (
              <Grid.Column>
                <NewPostForm />
              </Grid.Column>
            )}
            {loading ? (
              <h1>loading posts...</h1>
            ) : (
              <Transition.Group>
                {posts &&
                  posts.map((post) => (
                    <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                      <SinglePost post={post} />
                    </Grid.Column>
                  ))}
              </Transition.Group>
            )}
          </Grid.Row>
        </Grid>
      );
    }
  }
};

export default Home;
