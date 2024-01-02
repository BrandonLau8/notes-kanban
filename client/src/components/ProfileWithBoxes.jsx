import React from "react";


import Boxes from "./Boxes";

import ProfileHeader from "./ProfileHeader";
import { Outlet } from "react-router-dom";

const ProfileWithBoxes = () => {

  return (
    <>
      
        <ProfileHeader />
        <Boxes />
      <Outlet />
    </>
  );
};

export default ProfileWithBoxes;
