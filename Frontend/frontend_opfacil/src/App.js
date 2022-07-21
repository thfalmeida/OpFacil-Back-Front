import './App.css';
import React from 'react';
import Rotas from './routes/routes'
import PermanentDrawerLeft from './components/drawer'
import { Box } from '@mui/material';



function App() {
  return (
      <Box sx={{display:'flex'}}>
        {/* <MiniDrawer/> */}
        <PermanentDrawerLeft/>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Rotas/>
        </Box>
      </Box>
    // {/* <MiniDrawer/> */}
  )
}

export default App;
