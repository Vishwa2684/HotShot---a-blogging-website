import React, { useState,useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import NavBar from './Navbar.jsx';
import { Container, Typography, Box, Button } from '@mui/material';
import axios from 'axios';
import {Grid,Card,CardContent,IconButton} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Footer from './Footer.jsx';
import Aos from 'aos';

const months = {1:'January',2:'February',3:'March',4:'April',5:'May',6:'June',7:'July',8:'August',9:'September',10:'October',11:'November',12:'December'}

const Post = ({ post }) => {
  const navigate = useNavigate();
  
  const handleNavigate = () => {
    navigate(`/blog`, { state: { data: post } });
  };

  return (
    <Card elevation={2} sx={{ height: '100%' }} onClick={handleNavigate}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {post?.attributes.Title}
        </Typography>
        <Typography variant="body2">
          {post?.attributes.Content.substring(0, 100)}...
        </Typography>
        <IconButton 
          variant="contained" 
          color="primary" 
          onClick={handleNavigate}
        >
          <ArrowForwardIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

function Blog() {
  const location = useLocation();
  const { data } = location.state || {}; // Get the data from the state

  const [liked, setLiked] = useState(null);
  const [randomPosts, setRandomPosts] = useState([]);

  useEffect(()=>{
    Aos.init({
      duration: 2000,
      once:false
    })
  },[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:1337/api/blogs", {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_STRAPI}`
          }
        });
        if (response.status === 200) {
          const allBlogs = response.data.data;
          setLiked(allBlogs);

          // Generate 3 random unique indices
          const randomIndices = [];
          while (randomIndices.length < 3) {
            const randomIndex = Math.floor(Math.random() * allBlogs.length);
            if (!randomIndices.includes(randomIndex)) {
              randomIndices.push(randomIndex);
            }
          }

          // Set random posts based on random indices
          const randomSelectedPosts = randomIndices.map(index => allBlogs[index]);
          setRandomPosts(randomSelectedPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  
    fetchData();
  }, []);
  console.log(randomPosts)
  if (!data) {
    return <p>Loading...</p>;
  }

  const { attributes } = data;

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12;
    
    const formattedTime = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm
    return [date.getDate()+' '+months[date.getMonth()]+' '+date.getFullYear(),formattedTime];
  };


  let date = formatDate(attributes.Date);
  return (
    <>
      <NavBar />
      <Container maxWidth="md" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <Box textAlign="center">
          <Typography variant="h1" gutterBottom>
            {attributes.Title}
          </Typography>
        </Box>
        <Box textAlign="center" my={2}>
          <Typography variant="h6" sx={{color:'#fff',textAlign:'left'}} color="textSecondary">
            {date[0]} • {date[1]}
          </Typography>
          <Typography variant="h6" sx={{color:'#fff',textAlign:'right'}} color="textSecondary">
            
          </Typography>
        </Box>
        
        <Box my={4} display="flex" justifyContent="center">
          <Box 
            style={{ 
              width: '100%', 
              height: '300px', 
              backgroundColor: '#E0E0E0', 
              borderRadius: '8px', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center' 
            }}
          >
            <Typography variant="subtitle1" color="textSecondary">
              No image available
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1" paragraph>
          {attributes.Content}
        </Typography>
      </Container>
      <Box textAlign="center" my={4}>
      </Box>
      
      <Box my={4} data-aos-duration="1500" data-aos="fade-up">
          <Typography variant="h4" gutterBottom>
            You might also like
          </Typography>
          <Grid container spacing={3}>
            {randomPosts.map((post, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Post key={post?.attributes.id} post={post} />
              </Grid>
            ))}
          </Grid>
        </Box>
            <br/>
      <div data-aos="fade-up" data-aos-duration="1500">
        <Footer />
      </div>      
      
    </>
  );
}

export default Blog;