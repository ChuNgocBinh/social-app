import React from 'react';

export default function RightLargeSidebarLayout({children}){
  return (
    <div className=" col-9 border-start d-flex flex-column ps-1">
      {children}
    </div>
  )
}