import { AppBar, Toolbar, Typography, Container, Box, Button, CssBaseline } from '@mui/material';

import './Navbar.css'
export default function NavBar(){
    return (
    <div className='mainFlex'>
    
        <AppBar position="sticky" sx={{ zIndex: 1201, padding: '10px',backgroundColor:'#333' }}>
      
        <Toolbar sx={{padding: 0.5}}>
          <div className='logoDesign'>
            {/* <img src={logo} alt="logo" /> */}
            <Typography variant="h6" component="div" align="center" >
              HotShot &#128521;
            </Typography>
          </div>
          <Box ml="auto">
        <Button variant="contained" color="secondary" href="/login">Login</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>  
    )
}