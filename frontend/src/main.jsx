import React,{useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router,Routes,Route,useLocation} from 'react-router-dom'
import Blog from './components/Blog.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <ScrollToTop/>
    <Routes>
      <Route path='/' element={<App/>}></Route>
      <Route path='/blog' element={<Blog/>}></Route>
      <Route path='*' element={<NotFound/>}></Route>
    </Routes>
  </Router>
  </React.StrictMode> 
)

function NotFound(){
  return(
    <>
    <div>
      Page Not Found :)
    </div>
    </>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};