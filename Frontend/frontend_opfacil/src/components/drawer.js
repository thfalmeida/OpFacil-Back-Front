import * as React from 'react';
import { MapRoutes } from "../routes/routes";
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const navigate = useNavigate();
  // const styles = useStyles();

  const handleClickMenuButton = (obj) => (event) => {
    navigate(obj)
  };



  return (
    <div className='mainBox'>
      <Box sx={{ display: 'flex', }} >
        <CssBaseline />
        <Drawer 
          variant="permanent"
          anchor="left"
          sx={{
            color: 'white',
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {width: drawerWidth, boxSizing: 'border-box'}
          }}
        >
          <Toolbar />
          <Divider />
          <List>
            {Object.keys(MapRoutes).map((obj, index) => (
              <Link to={MapRoutes[obj].rota} key={index} underline="none" color='black'>
                <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton 
                    sx={{minHeight: 48, justifyContent: 'initial' ,px: 2.5,}}
                    onClick={handleClickMenuButton(MapRoutes[obj].rota)}
                  >
                    <ListItemIcon 
                      sx={{minWidth: 0, mr: 3, justifyContent: 'center',}}
                    >
                      {MapRoutes[obj].ico}
                    </ListItemIcon>
                    <ListItemText primary={MapRoutes[obj].title} sx={{ opacity:1 }} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>
      </Box>
    </div>
  );
}
