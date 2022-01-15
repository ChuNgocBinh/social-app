import React from "react";
import PostCard from "../PostCard/PostCard";
import request from "../../Api/request";

export default function ListPosts() {
  const [posts, setPosts] = React.useState([]);
  const fetchPosts = async () => {
    const res = await request({
      url: "/posts",
      method: "GET",
    });
    if (res.data) {
      setPosts(res.data);
    }
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      {posts.map((post) => {
        return (
          <div key={post._id} className="mb-3 bg-white p-2 rounded-3">
            <PostCard posts={posts} post={post} setPosts={setPosts} />
          </div>
        );
      })}
    </>
  );
}
