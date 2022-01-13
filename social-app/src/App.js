import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import useAuth from "./hooks/useAuth";
import AddFriends from "./Pages/AddFriends/AddFriends";
import CreatePost from "./Pages/CreatePost/CreatePost";
import EditProfile from "./Pages/EditProfile/Editprofile";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import PostDetail from "./Pages/PostDetail/PostDetail";
import Register from "./Pages/Register/Register";
import GuestPage from "./Pages/RulePage/GuestPage";
import PrivatePage from "./Pages/RulePage/PrivatePage";
import UserDetail from "./Pages/UserDetail/UserDetail";
import { fetchUserInfo } from "./redux/userSlice";
import io from "socket.io-client";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const status = useSelector((state) => state.user.status);
  const data = useSelector((state) => state);
  const user = useAuth();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const socket = io(process.env.REACT_APP_SOCKET_SERVER);
    // dispatch(activeSokcet(socket));
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  if (status === "idle" || status === "loading")
    return <div>Full page loading...</div>;
  if (status === "error") return <div>Error</div>;

  return (
    <Routes>
      <Route element={<GuestPage />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<PrivatePage />}>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
        <Route path="/friends" element={<AddFriends />} />
        <Route path="/user/:userId" element={<UserDetail />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
