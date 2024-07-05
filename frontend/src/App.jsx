import React,{useEffect} from 'react';
import BlogLayout from './components/BlogLayout';
import Aos from 'aos'
import NavBar from './components/Navbar';
import Footer from './components/Footer';
function App() {
  useEffect(() => {
    Aos.init({
      duration:1500,
      once:false
    })
  }, []);
  return (
    <div className="App">
      <NavBar/>
      <br/>
      <BlogLayout />
      <br/><br/>
      <div data-aos="fade-up" data-aos-duration="1500">
        <Footer />
      </div>
    </div>
  );
}

export default App;