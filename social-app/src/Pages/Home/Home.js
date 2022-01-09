import React from "react";
import request from "../../Api/request";
import ListFollow from "../../Components/Follow/ListFollow";
import ContentLayout from "../../Components/Layout/ContentLayout";
import MainLayout from "../../Components/Layout/MainLayout";
import RightSidebarLayout from "../../Components/Layout/RightSidebarLayout";
import ListPosts from "../../Components/ListPosts/ListPosts";
import useAuth from "../../hooks/useAuth";
import useSocket from "../../Components/SocketProvider/SocketProvider";
export default function Home() {
  const userMe = useAuth();

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
    <MainLayout>
      <ContentLayout>
        <div className="text-center my-2">
          <h4>Home</h4>
        </div>
        <div className="flex-grow-1 overflow-auto">
          <ListPosts posts={posts} />
        </div>
      </ContentLayout>
      <RightSidebarLayout>
        <ListFollow userIdProfile={userMe._id} page="home-following" />
      </RightSidebarLayout>
    </MainLayout>
  );
}
