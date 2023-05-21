import { createContext, useState } from "react";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [motionPicture, setMotionPicture] = useState("movie");

  function selectMotionPicture(selectedMotionPicture) {
    if(selectedMotionPicture === motionPicture) {
      return
    }
    setMotionPicture(selectedMotionPicture)
  }

  return (
    <Context.Provider
      value={{
        motionPicture,
        selectMotionPicture,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export { ContextProvider, Context };
