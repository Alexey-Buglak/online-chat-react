import React, { useContext } from 'react'
import { Context } from '../index'
import {  signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const Login = () => {
  const { auth } = useContext(Context)

  const login = () => {
    const provider = new GoogleAuthProvider()
   signInWithPopup(auth, provider)
     .then((result) => {
       // This gives you a Google Access Token. You can use it to access the Google API.
       const credential: any = GoogleAuthProvider.credentialFromResult(result)
       const token = credential.accessToken
       // The signed-in user info.
       const user = result.user
       console.log(user);
       
       // ...
     })
     .catch((error) => {
       // Handle Errors here.
       const errorCode = error.code
       const errorMessage = error.message
       // The email of the user's account used.
       const email = error.customData.email
       // The AuthCredential type that was used.
       const credential = GoogleAuthProvider.credentialFromError(error)
       // ...
     })
  }

  
  return (
    <div className="h-[90vh] flex items-center justify-center">
      <button
        onClick={login}
        className="max-w-md space-y-8 transition-all relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Anmelden mit Google
      </button>
    </div>
  )
}

export default Login
