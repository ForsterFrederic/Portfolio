import { createContext, useContext, useState, useEffect } from "react";

const WindowDimensionsContext = createContext(undefined);

export const useWindowDimensions = () => {
  return useContext(WindowDimensionsContext);
};

const WindowDimensionsProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  const wWCheck = (number) => {
    return windowWidth > number;
  };

  const wHCheck = (number) => {
    return windowHeight > number;
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const value = {
    windowWidth,
    windowHeight,
    wWCheck,
    wHCheck,
  };

  return (
      <WindowDimensionsContext.Provider value={value}>
        {children}
      </WindowDimensionsContext.Provider>
  );
};

export default WindowDimensionsProvider;
