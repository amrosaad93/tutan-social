import React, { useContext } from "react";
import { Button, Card, Icon, Image, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../context/auth";

const SinglePost = ({ post }) => {
  const { body, createdAt, id, username, likeCount, commentCount, likes } = post;

  const { user } = useContext(AuthContext);
  const likePost = () => {
    console.log("like Post");
  };

  return (
    <Card fluid>
      <Card.Content>
        <Image floated="right" size="mini" src="https://react.semantic-ui.com/images/avatar/large/molly.png" />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body} </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as="div" labelPosition="right" onClick={likePost}>
          <Button color="teal" basic>
            <Icon name="heart" />
          </Button>
          <Label basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
        <Button as="div" labelPosition="right" as={Link} to={`/posts/${id}`}>
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
        {user && user.username === username && (
          <Button as="div" color="red" floated="right" onClick={() => console.log("Delete post")}>
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

export default SinglePost;
