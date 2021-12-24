import React from 'react';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import LeftSidebarLayout from "../../Components/Layout/LeftSidebarLayout";
import ListMenuBar from "../ListMenuBar/ListMenuBar"

export default function FriendsLayout({ children }) {
  return (
    <div className="vh-100 d-flex ">
      <div>
        <Navbar />
      </div>
      <div className="flex-grow-1 d-flex flex-column">
        <div className="bg-light" style={{ height: '5vh' }}>
          <Header />
        </div>
        <div className="flex-grow-1 d-flex" style={{ height: '95vh' }}>
          <LeftSidebarLayout>
            <ListMenuBar />
          </LeftSidebarLayout>
          {children}
        </div>
      </div>
    </div>
  )
}