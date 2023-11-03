import React from "react";
import Notes from "./components/Notes";

const App = () => {
  return(
    <>
    <div style={{display:'grid', backgroundColor:'', justifyContent:'center'}}>
      <form>
        <label>username</label>
      <input />
      </form>
      <form>
        <label>password</label>
      <input />
      </form>
      <section>
        <button>
          Login
        </button>
      </section>

    </div>
    {/* <Notes /> */}
    </>
  );
};

export default App;
