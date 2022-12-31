import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Import the functions you need from the SDKs you need
import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCTjsQfluMFhrI-4Xz1n-hySX99Q56kvJE',
  authDomain: 'vue-test-7da3d.firebaseapp.com',
  databaseURL:
  'https://vue-test-7da3d-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'vue-test-7da3d',
  storageBucket: 'vue-test-7da3d.appspot.com',
  messagingSenderId: '664640375221',
  appId: '1:664640375221:web:f81f404649b209d7e931fc',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth()
const firestore = getFirestore(app)



export const Context = createContext<any>(null)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Context.Provider value={{
    auth,
    firestore,
    app
  }}>
    <App />
  </Context.Provider>,
)
