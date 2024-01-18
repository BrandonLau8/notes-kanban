import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../SideNavbar.css";
import CrudService from "../services/crud.service";
import Notes from "../services/note.service";
import { Outlet } from "react-router-dom";

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
  } = CrudService();

  const {
    notes,
    setNotes,
    noteInput,
    newLink,
    setNewLink,
    notesId,
    setNotesId,
    handleAddNote,
    handleDeleteNote,
    changeNoteInput,
    handleNoteSave,
  } = Notes();

  useEffect(() => {
    getBox();
  }, [isOpen]);

  // console.log("SideNavbar - note:", notes);
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

  const [isEditing, setIsEditing] = useState(true);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

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
            <div>
            <button onClick={handleAddNote}>New Note</button>
            </div>
            <div>
            {notes.slice(1).map((item) => (
              <div key={item.id} id={item.id}>
                <div>
                <Link
                  to={`/profile/${currentUser.id}/${item.id}`}
                  style={{ color: "white", backgroundColor: "blue" }}
                  onClick={() => setNotesId(item.id)} // Pass a function to onClick
                >
                 {item.noteInput}
                </Link>
                
                <button onClick={() => handleDeleteNote(item.id)}>Delete + {item.id}</button>
              </div>
              </div>
            ))}
            </div>
          </div>
        ) : null}

        <div id="main"></div>
      </div>
      <Outlet />
    </>
  );
};

export default SideNavbar;
