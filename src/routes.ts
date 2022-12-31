import Chat from "./components/Chat"
import Login from "./components/Login"

export const LOGIN_PATH = '/login'
export const CHAT_PATH = '/chat'

export const publicRoutes = [
  {
    path: LOGIN_PATH,
    Component: Login
  },
]

export const privatRoutes = [
  {
    path: CHAT_PATH,
    Component: Chat
  },
]

