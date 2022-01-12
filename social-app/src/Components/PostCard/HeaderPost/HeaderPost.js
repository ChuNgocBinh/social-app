import React from "react";
import UserComment from "../../User/UserComment";
import UserTimeCreateAt from "../../User/UserTimeCreateAt";
import EditPost from "../EditPost";

export const HeaderPost = ({ post, handleDeletePost }) => {
  return (
    <div>
      <UserTimeCreateAt post={post} />
      <EditPost post={post} handleDeletePost={handleDeletePost} />
    </div>
  );
};
