import React, { useContext, useState } from 'react'
import { Context } from '../index'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Loader from './Loader'
import {
  collection,
  addDoc,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'

const Chat = () => {
  const { auth, firestore } = useContext(Context)
  const [user]: any = useAuthState(auth)
  const [messages, loading]: any = useCollectionData(
    query(collection(firestore, 'messages'), orderBy('createdAt')),
  )
  const [value, setValue] = useState('')

  const sendMessage = async () => {
    if (value !== '') {
      await addDoc(collection(firestore, 'messages'), {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        text: value,
        createdAt: serverTimestamp(),
      })
      setValue('')
    }
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className="bg-sky-100 h-[90vh] flex flex-col px-2 py-1">
      <div className="overflow-y-auto">
        {messages.map((m: any) => (
          <div
            key={m.createdAt}
            className="flex h-[10vh] w-max max-w-[50%] flex-col mt-1 bg-sky-700 rounded-lg"
            style={{
              marginLeft: user.uid === m.uid ? 'auto' : '',
              padding:
                user.uid === m.uid ? '4px 4px 4px 8px' : '4px 8px 4px 4px',
            }}
          >
            <div
              className="flex h-[80%] items-center gap-x-1.5"
              style={{
                flexDirection: user.uid === m.uid ? 'row-reverse' : 'row',
              }}
            >
              <img
                src={m.photoURL}
                alt="avatar"
                className="rounded-[50%] h-full"
              />
              <p className="text-white leading-none">{m.text}</p>
            </div>
            <p className='text-[10px] text-white opacity-80'>{m.displayName}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center w-full mt-auto gap-x-3 mb-2">
        <input
          type="text"
          placeholder="Nachricht"
          value={value}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage()
            }
          }}
          onChange={(e) => setValue(e.target.value)}
          className="rounded-3xl px-3 py-2 w-full border-[1.5px] outline-none focus:border-slate-700"
        />
        <svg
          onClick={sendMessage}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="rgb(51 65 85)"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      </div>
    </div>
  )
}

export default Chat
