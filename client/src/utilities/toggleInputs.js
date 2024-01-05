import React, { useEffect, useState } from "react";

const toggleInputs = () => {
  const [isEditing, setIsEditing] = useState(true);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };


  return {
    isEditing,
    setIsEditing,
    toggleEditMode,
  }
};



export default toggleInputs