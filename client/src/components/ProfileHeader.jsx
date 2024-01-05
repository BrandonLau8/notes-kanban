import React, { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import NoteService from "../services/note.service";
import { Outlet } from "react-router-dom";
import toggleInputs from "../utilities/toggleInputs";

const ProfileHeader = () => {
  const currentUser = AuthService.getCurrentUser();

 

  return (
    <div className="ml-3">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
     
      <Outlet />
    </div>
  );
};

export default ProfileHeader;
