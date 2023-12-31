import React from "react";
import { NoteProvider, useNote } from "./NoteContext";

import Boxes from "./Boxes";
import SideNavbar from "./SideNavbar";
import ProfileHeader from "./ProfileHeader";

const Profile = () => {
  

  return (
    <>
      <NoteProvider>
        <SideNavbar />
        <ProfileHeader />
        <Boxes />
      </NoteProvider>
    </>
  );
};

export default Profile;
