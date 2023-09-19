'use client';
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { sideBarContent } from '@/app/constants/constants';
import { usePathname, useRouter } from 'next/navigation';
import {
  Category,
  Dashboard,
  Inventory,
  Person,
  ShoppingCart,
} from '@mui/icons-material';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 14px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 14px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function Sidebar({ open }) {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const getIcon = (ico) => {
    const icon = {
      Dashboard: <Dashboard />,
      ShoppingCart: <ShoppingCart />,
      Inventory: <Inventory />,
      Category: <Category />,
      Person: <Person />,
    }[ico];

    return icon;
  };

  return (
    <Box sx={{ display: 'flex', paddingRight: '16px' }}>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          '& .MuiDrawer-root': {
            position: 'relative',
            height: 'calc(100vh - 80px)',
            background: 'none',
            border: 'none',
          },
          '& .MuiPaper-root': {
            position: 'relative',
            height: 'calc(100vh - 80px)',
            background: 'none',
            border: 'none',
          },
        }}
      >
        <List sx={{ paddingTop: '16px' }}>
          {sideBarContent.map((item, index) => (
            <div
              className={`rounded-full bg-white shadow-md ml-[25px] h-[52px]
              mb-[20px] flex items-center justify-center cursor-pointer active:scale-90`}
              onClick={() => {
                router.push(item.link);
              }}
              key={item.name}
            >
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    '&:hover': { backgroundColor: 'transparent' },
                  }}
                  disableRipple
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: pathname.startsWith(item.link)
                        ? '#e47e52'
                        : '#0b1c48',
                    }}
                  >
                    {getIcon(item.icon)}
                  </ListItemIcon>

                  <div
                    style={{
                      display: open ? 'block' : 'none',
                      color: pathname.startsWith(item.link)
                        ? '#e47e52'
                        : '#0b1c48',
                      fontSize: '18px',
                      fontWeight: '500',
                      letterSpacing: '0.6px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.name}
                  </div>
                </ListItemButton>
              </ListItem>
            </div>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
