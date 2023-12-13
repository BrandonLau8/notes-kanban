import React from "react";
import AuthService from "../services/auth.service";
import Notes from "./Notes";
import { useParams } from "react-router-dom";
import SideNavbar from "./SideNavbar";

const Profile = () => {
  
  const currentUser = AuthService.getCurrentUser(); 

  return (
    
    <div className="container">
      <SideNavbar />
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

      <Notes />
    </div>

      
  );
};

export default Profile;