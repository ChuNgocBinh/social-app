import React from "react";
import postApi from "../../Api/postApi";
import ButtonHome from "../Button/ButtonHome";
import UserTimeCreateAt from "../User/UserTimeCreateAt";
import { HeaderPost } from "./HeaderPost/HeaderPost";

export default function PostCard({ post, posts, setPosts }) {
  console.log(posts);
  const handleDeletePost = (id) => {
    // if (window.confirm("Are you sure want to delete this post?")) {
    // await postApi.deletePost(id);
    const newPosts = posts.filter((post) => post._id !== id);
    setPosts(newPosts);
    // }
  };
  return (
    <>
      <div>
        <HeaderPost post={post} handleDeletePost={handleDeletePost} />
        <div className="me-1 ">
          <div
            className="mb-2  text-break"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="w-100">
            <img src={post.images} alt="anh" className="w-100" />
          </div>
        </div>
        <ButtonHome
          postId={post._id}
          like={post.likes}
          commentCount={post.commentCount}
        />
      </div>
    </>
  );
}
