import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../SideNavbar.css";
import Crud from "./Crud";

const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    getBox,
    handleAddBox,
    handleDeleteBox,
    handleSave,
    changeInput,
    box,
    setBox,
    input,
    setInput,
    note,
    setNote,
  } = Crud();

  const openNav = () => {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    setIsOpen(true);
    
  };

  function closeNav() {
    document.getElementById("mySidebar").style.width = "50px";
    document.getElementById("main").style.marginLeft = "0";
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

  // function addNote() {
  //   const newNote = { index: note.length, item: `Note ${note.length+1}` };
  //   setNote((prevNote) => [...prevNote, newNote]);
  //   console.log(note)
  // }

  return (
    <>
      <div id="mySidebar" className="sidebar">
        <div className="burger" id="burger-container" onClick={myFunction}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>

        {/* <button onClick={addNote}>Add Note</button> */}

        {isOpen ? (
          <div>
            {note.map((item) => (
              <div  key={item.id}>
                <div style={{ color: "white" }}>
                  <div>
                    <label>{item.input}</label>
                    </div>
                  </div>
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
