import { createContext, useState } from "react";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [motionPicture, setMotionPicture] = useState("movie");

  function toggleMotionPicture() {
    setMotionPicture((prevMotionPicture) =>
      prevMotionPicture === "movie" ? "tv" : "movie"
    );
  }

  return (
    <Context.Provider
      value={{
        motionPicture,
        toggleMotionPicture,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export { ContextProvider, Context };
