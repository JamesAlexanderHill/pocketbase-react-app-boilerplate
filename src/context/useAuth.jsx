import { createContext, useContext } from "react";

import usePocketbase from "../hooks/usePocketbase";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const auth = usePocketbase();
    console.log(auth)
  
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
const useAuth = () => useContext(AuthContext);

export default useAuth;