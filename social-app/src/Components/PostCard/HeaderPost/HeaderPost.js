import React from "react";
import UserComment from "../../User/UserComment";
import UserTimeCreateAt from "../../User/UserTimeCreateAt";
import OptionsPost from "../optionsPost";

export const HeaderPost = ({ post, handleDeletePost }) => {
  return (
    <div className='d-flex justify-content-between'>
      <UserTimeCreateAt post={post} />
      <OptionsPost post={post} handleDeletePost={handleDeletePost} />
    </div>
  );
};
