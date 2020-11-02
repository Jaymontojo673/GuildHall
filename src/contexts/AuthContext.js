import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [ currentUser, setCurrentUser] =useState()
  const [ loading, setLoading] =useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  useEffect(() => {
    //sets current user when the above function runs.
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    //unsubscribes us from the onAuthStateChanged listener
    return unsubscribe
  }, [])


  const value = {
    currentUser,
    signup
  }

  return (
    <div>
      <AuthContext.Provider value ={ value }>
        {!loading && children}
      </AuthContext.Provider>
    </div>
  )
}