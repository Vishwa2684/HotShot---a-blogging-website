import React from 'react';
import { useState,useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Box, IconButton, duration } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css';
import '../App.css'
// I SHOULD SEND DATA FROM BLOG LAYOUT TO BLOG COMPONENT FOR FUNCTIONALITY OF APP

const TopBlogPost = ({ post }) => {
  const navigate = useNavigate();
  
  const handleNavigate = () => {
    navigate(`/blog`, { state: { data: post } });
  };

  return (
    <Card elevation={3} sx={{ height: '100%' }} onClick={handleNavigate}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {post.attributes.Title}
        </Typography>
        <Typography variant="body1" paragraph>
          {post.attributes.Content.substring(0, 200)}...
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

const SmallBlogPost = ({ post }) => {
  const navigate = useNavigate();
  
  const handleNavigate = () => {
    navigate(`/blog`, { state: { data: post } });
  };
  
  return (
    <Card elevation={2} sx={{ mb: 2, height: '100%' }} onClick={handleNavigate}>
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

const FeaturedPost = React.memo(({ post, isCentered }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/blog`, { state: { data: post } });
  };

  return (
    <Card onClick={handleNavigate}
      elevation={2}
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transform: isCentered ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform 0.3s ease-in-out'
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant={isCentered ? "h5" : "h6"} gutterBottom>
          {post?.attributes.Title}
        </Typography>
        <Typography variant="body2">
          {post?.attributes.Content.substring(0, isCentered ? 100 : 50)}...
        </Typography>
      </CardContent>
      <Box sx={{ p: 1 }}>
        <IconButton color="primary" onClick={handleNavigate}>
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Card>
  );
});


const MoreBlogPosts = ({ posts }) => {
  const navigate = useNavigate();
  
  const handleNavigate = (post) => {
    navigate(`/blog`, { state: { data: post } });
  };

  return (
    <Box  sx={{ mt: 4 }} data-aos="fade-up" data-aos-duration="1000" onClick={handleNavigate}>
      <Typography variant="h5" gutterBottom>
        More Blogs
      </Typography>
      <Grid container spacing={2}>
        {posts.map((post, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} data-aos="fade-up" data-aos-delay={index * 100}>
            <Card onClick={()=>handleNavigate(post)} elevation={1}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {post?.attributes.Title}
                </Typography>
                <Grid><Typography variant="body2">
                  {post?.attributes.Content.substring(0,17)}...
                </Typography>
                <IconButton 
                  variant="contained" 
                  color="primary" 
                  onClick={() => handleNavigate(post)}
                >
                  <ArrowForwardIcon />
                </IconButton></Grid>
                
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const BlogLayout = () => {
  const [topPosts, setTopPosts] = useState([]);
  const[featuredPosts,setFeaturedPosts] = useState([]);
  const [morePosts, setMorePosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const postsPerPage = 3;
  console.log("Hi there")
  const [slideDirection, setSlideDirection] = useState('');
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(1);
  let data=null
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:1337/api/blogs", {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_STRAPI}`
          }
        });
        if (response.status === 200) {
          data = (response.data.data);
          let top = data.slice(0,3);
          setTopPosts(top)
          let featured = data.slice(3,9)
          setFeaturedPosts(featured)
          let more = data.slice(9)
          console.log(more)
          setMorePosts(more)
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [currentFeaturedIndex]);

  const handlePrevious = () => {
    setCurrentFeaturedIndex((prev) => (prev === 0 ? featuredPosts.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentFeaturedIndex((prev) => (prev === featuredPosts.length - 1 ? 0 : prev + 1));
  };

  const getVisiblePosts = () => {
    const prevIndex = currentFeaturedIndex === 0 ? featuredPosts.length - 1 : currentFeaturedIndex - 1;
    const nextIndex = currentFeaturedIndex === featuredPosts.length - 1 ? 0 : currentFeaturedIndex + 1;
    return [
      featuredPosts[prevIndex],
      featuredPosts[currentFeaturedIndex],
      featuredPosts[nextIndex]
    ];
  };


  const visiblePosts = [featuredPosts.slice(currentIndex, currentIndex + postsPerPage)];

return (
  <>
    <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
            Top blogs 🔥
            </Typography>
        </Grid>

        <Grid item xs={12} md={8}>
          {topPosts.length > 0 && <TopBlogPost post={topPosts[0]} />}
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              {topPosts.length > 1 && <SmallBlogPost post={topPosts[1]} />}
            </Grid>
            <Grid item>
              {topPosts.length > 2 && <SmallBlogPost post={topPosts[2]} />}
            </Grid>
          </Grid>
        </Grid>

      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
          <IconButton onClick={handlePrevious}>
            <ArrowBackIcon sx={{ color: '#fff' }} />
          </IconButton>
          <Typography variant="h6">CONTINUE READING</Typography>
          <IconButton onClick={handleNext}>
            <ArrowForwardIcon sx={{ color: '#fff' }} />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '400px', overflow: 'hidden' }}>
          {getVisiblePosts().map((post, index) => (
            <Box 
              key={post?.attributes.id} 
              sx={{ width: index === 1 ? '40%' : '30%', px: 1 }}
              data-aos={index === 0 ? "fade-right" : index === 2 ? "fade-left" : "fade-up"}
              data-aos-duration="800"
            >
              <FeaturedPost post={post} isCentered={index === 1} />
            </Box>
          ))}
        </Box>
      </Grid>


        <Grid item xs={12}>
          <MoreBlogPosts posts={morePosts} />
        </Grid>
      </Grid>
    </Container>
    
  </>  
  );

}

export default BlogLayout;
