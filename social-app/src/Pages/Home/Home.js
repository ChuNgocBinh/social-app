import React from "react";
import request from "../../Api/request";
import ListFollow from "../../Components/Follow/ListFollow";
import ContentLayout from "../../Components/Layout/ContentLayout";
import MainLayout from "../../Components/Layout/MainLayout";
import RightSidebarLayout from "../../Components/Layout/RightSidebarLayout";
import ListPosts from "../../Components/ListPosts/ListPosts";
import useAuth from "../../hooks/useAuth";
export default function Home() {
  const userMe = useAuth();

  return (
    <MainLayout>
      <ContentLayout>
        <div className="text-center my-2">
          <h4>Home</h4>
        </div>
        <div className="flex-grow-1 overflow-auto">
          <ListPosts />
        </div>
      </ContentLayout>
      <RightSidebarLayout>
        <ListFollow userIdProfile={userMe._id} page="home-following" />
      </RightSidebarLayout>
    </MainLayout>
  );
}
