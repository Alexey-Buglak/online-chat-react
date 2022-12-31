import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { NavLink } from 'react-router-dom'
import { LOGIN_PATH } from '../routes'
import { Context } from '../index'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'

const Navbar = () => {
  const { auth } = useContext(Context)
  const [user] = useAuthState(auth)

  const outSign = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      })
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Online React Chat von Alexey
          </Typography>

          {user ? (
            <Button onClick={outSign} variant={'contained'}>Abmelden</Button>
          ) : (
            <NavLink to={LOGIN_PATH}>
              <Button variant={'contained'}>Anmelden</Button>
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
