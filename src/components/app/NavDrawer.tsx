'use client';

import React from 'react'

import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'

import Dashboard from '@mui/icons-material/Dashboard'
import Home from '@mui/icons-material/Home'
import InfoOutlined from '@mui/icons-material/InfoOutlined'
import LibraryBooks from '@mui/icons-material/LibraryBooks'
import Login from '@mui/icons-material/Login'
import Logout from '@mui/icons-material/Logout'

import Link from 'next/link'
import { useSelectedLayoutSegments } from 'next/navigation'

import { useSession } from 'next-auth/react';

const NavDrawer = ({ children, navOpen, closeNav }: { children: React.ReactNode, navOpen: boolean, closeNav: () => void }) => {
  const path = useSelectedLayoutSegments().filter((p) => { return p[0] != '(' });

  const { data: session } = useSession();

  return (
    <Box display={'flex'} flexGrow={1}>
      <Drawer
        variant={'permanent'}
        anchor={'left'}
        sx={{ minWidth: 250, display: { xs: 'none', lg: 'block' } }}
      >
        <Toolbar />
        <Stack direction={'column'} justifyContent={'space-between'} flexGrow={1}>
          <List>
            <ListItem disablePadding>
              <Link href={'/'}>
                <ListItemButton sx={{ minWidth: 250 }} onClick={closeNav}>
                  <ListItemIcon sx={{ minWidth: 35 }}>
                    <Home sx={{ color: !path.length ? 'black.dark' : 'grey.dark' }} />
                  </ListItemIcon>
                  <ListItemText sx={{ color: !path.length ? 'black.dark' : 'black.light' }} primaryTypographyProps={{ fontWeight: !path.length ? 600 : 500 }}>Home</ListItemText>
                </ListItemButton>
              </Link>
            </ListItem>
            <Divider />
            {!session &&
              <>
                <ListItem disablePadding>
                  <Link href={'/login'}>
                    <ListItemButton sx={{ minWidth: 250 }} onClick={closeNav}>
                      <ListItemIcon sx={{ minWidth: 35 }}>
                        <Login sx={{ color: path[0] == 'login' ? 'black.dark' : 'grey.dark' }} />
                      </ListItemIcon>
                      <ListItemText sx={{ color: path[0] == 'login' ? 'black.dark' : 'black.light' }} primaryTypographyProps={{ fontWeight: path[0] == 'login' ? 600 : 500 }}>Login</ListItemText>
                    </ListItemButton>
                  </Link>
                </ListItem>
                <Divider />
              </>
            }
            {session &&
              <>
                <ListItem disablePadding>
                  <Link href={'/dashboard'}>
                    <ListItemButton sx={{ minWidth: 250 }} onClick={closeNav}>
                      <ListItemIcon sx={{ minWidth: 35 }}>
                        <Dashboard sx={{ color: path[0] == 'dashboard' ? 'black.dark' : 'grey.dark' }} />
                      </ListItemIcon>
                      <ListItemText sx={{ color: path[0] == 'dashboard' ? 'black.dark' : 'black.light' }} primaryTypographyProps={{ fontWeight: path[0] == 'dashboard' ? 600 : 500 }}>Dashboard</ListItemText>
                    </ListItemButton>
                  </Link>
                </ListItem>
                <Divider />
              </>
            }
            {session &&
              <>
                <ListItem disablePadding>
                  <Link href={'/collection'}>
                    <ListItemButton sx={{ minWidth: 250 }} onClick={closeNav}>
                      <ListItemIcon sx={{ minWidth: 35 }}>
                        <LibraryBooks sx={{ color: path[0] == 'collection' ? 'black.dark' : 'grey.dark' }} />
                      </ListItemIcon>
                      <ListItemText sx={{ color: path[0] == 'collection' ? 'black.dark' : 'black.light' }} primaryTypographyProps={{ fontWeight: path[0] == 'collection' ? 600 : 500 }}>Collection</ListItemText>
                    </ListItemButton>
                  </Link>
                </ListItem>
                <Divider />
              </>
            }
            <ListItem disablePadding>
              <Link href={'/about'}>
                <ListItemButton sx={{ minWidth: 250 }} onClick={closeNav}>
                  <ListItemIcon sx={{ minWidth: 35 }}>
                    <InfoOutlined sx={{ color: path[0] == 'about' ? 'black.dark' : 'grey.dark' }} />
                  </ListItemIcon>
                  <ListItemText sx={{ color: path[0] == 'about' ? 'black.dark' : 'black.light' }} primaryTypographyProps={{ fontWeight: path[0] == 'about' ? 600 : 500 }}>About</ListItemText>
                </ListItemButton>
              </Link>
            </ListItem>
            <Divider />
          </List>
          <List>
            {session &&
              <>
                <Divider />
                <ListItem disablePadding>
                  <Link href={'/logout'}>
                    <ListItemButton sx={{ minWidth: 250 }} onClick={closeNav}>
                      <ListItemIcon sx={{ minWidth: 35 }}>
                        <Logout sx={{ color: path[0] == 'logout' ? 'black.dark' : 'grey.dark' }} />
                      </ListItemIcon>
                      <ListItemText sx={{ color: path[0] == 'logout' ? 'black.dark' : 'black.light' }} primaryTypographyProps={{ fontWeight: path[0] == 'logout' ? 600 : 500 }}>Logout</ListItemText>
                    </ListItemButton>
                  </Link>
                </ListItem>
              </>
            }
          </List>
        </Stack>
      </Drawer>

      <Drawer
        variant={'temporary'}
        anchor={'left'}
        open={navOpen}
        onClose={closeNav}
        sx={{ minWidth: 250, display: { lg: 'none' } }}
      >
        <Toolbar />
        <Stack direction={'column'} justifyContent={'space-between'} flexGrow={1}>
          <List>
            <ListItem disablePadding>
              <Link href={'/'}>
                <ListItemButton sx={{ minWidth: 250 }} onClick={closeNav}>
                  <ListItemIcon sx={{ minWidth: 35 }}>
                    <Home sx={{ color: !path.length ? 'black.dark' : 'grey.dark' }} />
                  </ListItemIcon>
                  <ListItemText sx={{ color: !path.length ? 'black.dark' : 'black.light' }} primaryTypographyProps={{ fontWeight: !path.length ? 600 : 500 }}>Home</ListItemText>
                </ListItemButton>
              </Link>
            </ListItem>
            <Divider />
            {!session &&
              <>
                <ListItem disablePadding>
                  <Link href={'/login'}>
                    <ListItemButton sx={{ minWidth: 250 }} onClick={closeNav}>
                      <ListItemIcon sx={{ minWidth: 35 }}>
                        <Login sx={{ color: path[0] == 'login' ? 'black.dark' : 'grey.dark' }} />
                      </ListItemIcon>
                      <ListItemText sx={{ color: path[0] == 'login' ? 'black.dark' : 'black.light' }} primaryTypographyProps={{ fontWeight: path[0] == 'login' ? 600 : 500 }}>Login</ListItemText>
                    </ListItemButton>
                  </Link>
                </ListItem>
                <Divider />
              </>
            }
            {session &&
              <>
                <ListItem disablePadding>
                  <Link href={'/dashboard'}>
                    <ListItemButton sx={{ minWidth: 250 }} onClick={closeNav}>
                      <ListItemIcon sx={{ minWidth: 35 }}>
                        <Dashboard sx={{ color: path[0] == 'dashboard' ? 'black.dark' : 'grey.dark' }} />
                      </ListItemIcon>
                      <ListItemText sx={{ color: path[0] == 'dashboard' ? 'black.dark' : 'black.light' }} primaryTypographyProps={{ fontWeight: path[0] == 'dashboard' ? 600 : 500 }}>Dashboard</ListItemText>
                    </ListItemButton>
                  </Link>
                </ListItem>
                <Divider />
              </>
            }
            {session &&
              <>
                <ListItem disablePadding>
                  <Link href={'/collection'}>
                    <ListItemButton sx={{ minWidth: 250 }} onClick={closeNav}>
                      <ListItemIcon sx={{ minWidth: 35 }}>
                        <LibraryBooks sx={{ color: path[0] == 'collection' ? 'black.dark' : 'grey.dark' }} />
                      </ListItemIcon>
                      <ListItemText sx={{ color: path[0] == 'collection' ? 'black.dark' : 'black.light' }} primaryTypographyProps={{ fontWeight: path[0] == 'collection' ? 600 : 500 }}>Collection</ListItemText>
                    </ListItemButton>
                  </Link>
                </ListItem>
                <Divider />
              </>
            }
            <ListItem disablePadding>
              <Link href={'/about'}>
                <ListItemButton sx={{ minWidth: 250 }} onClick={closeNav}>
                  <ListItemIcon sx={{ minWidth: 35 }}>
                    <InfoOutlined sx={{ color: path[0] == 'about' ? 'black.dark' : 'grey.dark' }} />
                  </ListItemIcon>
                  <ListItemText sx={{ color: path[0] == 'about' ? 'black.dark' : 'black.light' }} primaryTypographyProps={{ fontWeight: path[0] == 'about' ? 600 : 500 }}>About</ListItemText>
                </ListItemButton>
              </Link>
            </ListItem>
            <Divider />
          </List>
          <List>
            {session &&
              <>
                <Divider />
                <ListItem disablePadding>
                  <Link href={'/logout'}>
                    <ListItemButton sx={{ minWidth: 250 }} onClick={closeNav}>
                      <ListItemIcon sx={{ minWidth: 35 }}>
                        <Logout sx={{ color: path[0] == 'logout' ? 'black.dark' : 'grey.dark' }} />
                      </ListItemIcon>
                      <ListItemText sx={{ color: path[0] == 'logout' ? 'black.dark' : 'black.light' }} primaryTypographyProps={{ fontWeight: path[0] == 'logout' ? 600 : 500 }}>Logout</ListItemText>
                    </ListItemButton>
                  </Link>
                </ListItem>
              </>
            }
          </List>
        </Stack>
      </Drawer>
      {children}
    </Box >
  )
}

export default NavDrawer