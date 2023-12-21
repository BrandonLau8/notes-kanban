import React from "react";
import Boxes from "./Boxes";
import SideNavbar from "./SideNavbar";
import ProfileHeader from "./ProfileHeader";
import Notes from "./Notes";
import { NoteProvider } from "./NoteContext";

const Profile = () => {
  

  return (
    <NoteProvider>
    <>
      <SideNavbar/>
      <ProfileHeader />
      <Boxes />
    </>
    </NoteProvider>
  );
};

export default Profile;
