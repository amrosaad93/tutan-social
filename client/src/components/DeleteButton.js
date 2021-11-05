import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button, Confirm, Icon } from "semantic-ui-react";

import { FETCH_POSTS_QUERY } from "../util/graphql";

const DeleteButton = ({ postId, callback }) => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      setOpenConfirm(false);
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: data.getPosts.filter((p) => p.id !== postId),
        },
      });
      if (callback) callback();
    },
    variables: {
      postId,
    },
  });

  return (
    <>
      <Button as="div" color="red" floated="right" onClick={() => setOpenConfirm(true)}>
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm open={openConfirm} onCancel={() => setOpenConfirm(false)} onConfirm={deletePost} />
    </>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;
