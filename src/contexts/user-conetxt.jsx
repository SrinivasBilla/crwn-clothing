import userEvent from "@testing-library/user-event";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedLister, signOutUser } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
})

export const UserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null)
  const value={currentUser, setCurrentUser}

  useEffect(() => {
    const unsubscribe = onAuthStateChangedLister((user) => {
      if(user) {  
          createUserDocumentFromAuth(user)
      }
      console.log(user);
      
      
    })
    return unsubscribe
  }, [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}