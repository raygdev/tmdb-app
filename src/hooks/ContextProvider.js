import { createContext, useState } from "react";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [motionPicture, setMotionPicture] = useState("movie");
  const loader = <div className="loader"></div>;

  function toggleMotionPicture() {
    setMotionPicture((prevMotionPicture) =>
      prevMotionPicture === "movie" ? "tv" : "movie"
    );
  }

  return (
    <Context.Provider
      value={{
        isLoading,
        setIsLoading,
        loader,
        motionPicture,
        toggleMotionPicture,
        URL,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export { ContextProvider, Context };
