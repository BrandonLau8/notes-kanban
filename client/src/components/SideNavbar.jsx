import React from "react";
import {Link} from 'react-router-dom'
import "../SideNavbar.css";


const SideNavbar = () => {
  const openNav = () => {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  };

  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
  return (
    <>
      <div id="mySidebar" className="sidebar">
        <Link to="javascript:void(0)" className="closebtn" onClick={closeNav}>
          ×
        </Link>
        
        <form>
        <input type="text" id='mytext'></input>
        <Link to="#">Add Note</Link>
        </form>
    
      </div>

      <div id="main">
        <button className="openbtn" onClick={openNav}>
          ☰ Open Sidebar
        </button>
      </div>
    </>
  );
};

export default SideNavbar;
