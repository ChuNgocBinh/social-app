import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import request from "../../Api/request";
import Comment from "../../Components/Comment/Comment";
import FormComment from "../../Components/FormComment/FormComment";
import ContentLayout from "../../Components/Layout/ContentLayout";
import MainLayout from "../../Components/Layout/MainLayout";
import RightSidebarLayout from "../../Components/Layout/RightSidebarLayout";
import PostCard from "../../Components/PostCard/PostCard";
import { useSocket } from "../../Components/SocketProvider/SocketProvider";
import { SocketContext } from "../../context/socket";
import useAuth from "../../hooks/useAuth";

export default function PostDetail() {
  const [post, setPost] = React.useState({});
  const [comments, setComments] = React.useState([]);
  const [profile, setProfile] = React.useState({});
  const { isConnected, socketRef } = useSocket();

  const user = useAuth();

  const params = useParams();

  const { postId } = params;
  const commentCount = comments.length;

  const fetchPosts = async () => {
    const res = await request({
      url: `/posts/post/${postId}`,
      method: "GET",
    });

    if (res.data) {
      setPost(res.data);
    }
  };

  const fetchComments = async () => {
    const res = await request({
      url: `/comments/post/${postId}`,
      method: "GET",
    });

    if (res.data) {
      setComments(res.data);
    }
  };
  React.useEffect(() => {
    fetchPosts();
  }, []);

  React.useEffect(() => {
    fetchComments();
  }, []);

  React.useEffect(() => {}, [isConnected, postId, socketRef]);
  const handleAddComment = async (value) => {
    const incRes = await request({
      url: `/posts/${postId}/incCommentPost`,
      method: "PUT",
    });

    const datapost = { ...incRes.data, userId: user };
    setPost(datapost);
    if (isConnected) {
      socketRef.emit("join-post", postId);
    }
    const res = await request({
      url: "/comments/create",
      method: "POST",
      data: value,
    });
    const data = { ...res.data, userId: user };
    setComments((prev) => [...prev, data]);
  };

  return (
    <MainLayout>
      <ContentLayout>
        <div className="text-center my-2">
          <h4>Post Detail</h4>
        </div>
        <div className="flex-grow-1 overflow-auto">
          <div className="mb-3 bg-white p-2 rounded-3">
            <PostCard post={post} commentCount={commentCount} />
          </div>
        </div>
      </ContentLayout>
      <RightSidebarLayout>
        <div className="text-center my-2">
          {/* <UserComment profile={profile} /> */}
        </div>
        <div className="flex-grow-1 overflow-auto">
          {comments.map((comment) => {
            return (
              <div className="mb-2 d-flex " key={comment._id}>
                <Comment comment={comment} />
              </div>
            );
          })}
        </div>
        <div className="mb-2 d-flex ">
          <FormComment postId={postId} handleAddComment={handleAddComment} />
        </div>
      </RightSidebarLayout>
    </MainLayout>
  );
}
