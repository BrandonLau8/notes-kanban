import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../SideNavbar.css";
import Crud from "./Crud";
import Notes from "./Notes";

const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState("50px");
  const [mainMargin, setMainMargin] = useState("0");

  const {
    currentUser,
    getBox,
    handleAddBox,
    handleDeleteBox,
    handleSave,
    changeInput,
    box,
    setBox,
    input,
    setInput,
  } = Crud();

  const { note, setNote, noteInput, handleAddNote, changeNoteInput } = Notes();

  useEffect(() => {
    getBox();
  }, [isOpen]);

  const openNav = () => {
    setSidebarWidth("250px");
    setMainMargin("250px");
    setIsOpen(true);
  };

  function closeNav() {
    setSidebarWidth("50px");
    setMainMargin("0");
    setIsOpen(false);
  }

  function myFunction() {
    const burgerIcon = document.getElementById("burger-container");

    if (isOpen) {
      closeNav();
      burgerIcon.classList.toggle("change");
    } else {
      openNav();
      burgerIcon.classList.toggle("change");
    }
  }

  return (
    <>
      <div id="mySidebar" className="sidebar" style={{ width: sidebarWidth }}>
        <div className="burger" id="burger-container" onClick={myFunction}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>

        {isOpen ? (
          <div>
            {note.map((item) => (
              <div key={item.id}>
                <Link
                  to={`/profile/${currentUser.id}/${noteInput}`}
                  style={{ color: "white" }}
                >
                  {item.input}
                </Link>
              </div>
            ))}
          </div>
        ) : null}
        <div id="main"></div>
      </div>
    </>
  );
};

export default SideNavbar;
