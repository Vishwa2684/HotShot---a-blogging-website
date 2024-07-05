import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: '#333',
        color: 'text.paper',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" color="text.paper" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              HotShot is currently under development. We are working hard to bring you the best content on various topics. Stay tuned for more exciting updates!
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box>
              <Typography variant="h6" color="text.paper" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2">
                123 Blog Street, Blogtown 12345
              </Typography>
              <Typography variant="body2">
                Email: info@example.com
              </Typography>
              <Typography variant="body2">
                Phone: +91 63053 60524
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box mt={5} display="flex" justifyContent="center">
          <IconButton color="inherit" aria-label="Facebook" component="a" href="https://facebook.com" target='_blank'>
            <FacebookIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="Twitter" component="a" href="https://x.com/ymuzan26" target='_blank'>
            <TwitterIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="Instagram" component="a" href="https://www.instagram.com/vishwa.t26?igsh=eXBxMnFhMzYwcXVi" target='_blank'>
            <InstagramIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="LinkedIn" component="a" href="https://www.linkedin.com/in/vishwa-teja-b837b1268/" target='_blank'> 
            <LinkedInIcon />
          </IconButton>
        </Box>

        <Box mt={3}>
          <Typography variant="body2" color="text.paper" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://your-website.com/">
              Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;