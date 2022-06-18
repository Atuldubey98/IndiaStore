import { createContext} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useQuery from "../hooks/useQuery";

export const ApplicationContext = createContext();
// Work on sidemenu
export const ApplicationProvider = ({ children }) => {
  const query = useQuery();
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleOpenSideMenu = () => {
    navigate(!query.has("sidemenu") ? location.pathname+"?sidemenu=true" : location.pathname);
  };
  
  return (
    <ApplicationContext.Provider
      value={{
        handleOpenSideMenu
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
