import React, { useEffect, useState } from "react";
// import {Link} from 'react-router-dom';

function Tweet() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const data = await fetch("http://localhost:3001/tweets");
      const items = await data.json();
      console.log("Fetched items:", items);
      setItems(items);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };
  return (
    <>
      <section>
        {items.map((item) => (
          <div key={item.id}>
            <h6>{item.name}</h6>
            <p>{item.msg}</p>
            <p>
              <i>by {item.username}</i>
            </p>
          </div>
        ))}
      </section>
    </>
  );
}

export default Tweet;
