import { createContext, useState } from "react";

export const MovieDetailsContext = createContext({ title: '', fetchUrl: '' });

// @function  UserProvider
// Create function to provide UserContext
export const MovieProvider = ({ children }) => {
  const [playmovie, setPlayovie] = useState({ title: '', fetchUrl: ''});

  const currMovie = (mtitle, mfetchUrl) => {
    setPlayovie((useplaymovier) => ({
      title: mtitle,
      fetchUrl: mfetchUrl,
    }));
    };
    
    return (
        <MovieDetailsContext.Provider value={{ playmovie, currMovie }}>
          {children}
        </MovieDetailsContext.Provider>
      );
    };

