import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import moment from "moment";
import { Button, Card, Grid, Image, Icon, Label } from "semantic-ui-react";
import { useParams, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";

const PostPage = (props) => {
  const navigate = useNavigate();

  const params = useParams();
  const postId = params.postId;

  const { user } = useContext(AuthContext);

  const { data, loading } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  function deletePostCallback() {
    navigate("/", { replace: true });
  }

  if (loading) {
    return <p>Loading...</p>;
  } else {
    console.log(data);

    const { id, body, createdAt, username, comments, likes, likeCount, commentsCount } = data.getPost;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image src="https://react.semantic-ui.com/images/avatar/large/molly.png" size="small" float="right" />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <Button as="div" labelPosition="right" onclick={() => console.log("Comment")}>
                  <Button basic color="blue">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentsCount}
                  </Label>
                </Button>
                {user && user.username === username && <DeleteButton postId={id} callback={deletePostCallback} />}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
};

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
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

export default PostPage;