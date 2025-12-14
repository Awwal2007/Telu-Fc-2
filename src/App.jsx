
import { BrowserRouter, Route, Routes, useLocation, matchRoutes} from 'react-router-dom';
import {Toaster} from 'sonner'

import './App.css'
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Footer from './components/Footer.jsx';
import IwoLand from './pages/IwoLand.jsx';
import Blogs from './pages/Blogs.jsx';
import SingleBlog from './components/SingleBlog.jsx';
import Gallery from './pages/Gallery.jsx';
import Admin from './pages/Admin.jsx';
import { NewsProvider } from './contexts/NewsProvider.jsx';
import AdminSignup from './pages/AdminSignup.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';
import NotFound from './components/NotFound.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import MissedArticles from './components/OurPlayers.jsx';
import ApplicationForm from './pages/ApplicationForm.jsx';
import PlayersPage from './pages/PlayersPage.jsx';


const AppContent = () => {
  const location = useLocation();
  const hideHeaderRoutes = [
    '/admin',
    // '/admin-signup',
    '/admin-login',
    '/application-form',
    '/players'
  ];
  const hideFooterRoutes = [
    '/admin',
    // '/admin-signup',
    '/admin-login',
    '/application-form',
    '/players'
  ];

  //All Routes

  const routes = [
    { path: "/" },
    { path: "/blogs" },
    { path: "/gallery" },
    { path: "/singleblog/:id" },
    { path: "/admin-login" },
    // { path: "/admin-signup" },
    { path: "/admin" },
  ];

  const matched = matchRoutes(routes, location);
  const isNotFoundPage = !matched; // if no route matches, it's NotFound

  const shouldHideHeader = isNotFoundPage || hideHeaderRoutes.includes(location.pathname);
  const shouldHideFooter = isNotFoundPage || hideFooterRoutes.includes(location.pathname);
    return (
      <>
        {/* <div className="pop-up">
          <img src="" alt="" />
        </div> */}
        {!shouldHideHeader && <Header />}
        
      <AuthProvider>
        <NewsProvider>
         {/* <Header /> */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='*' element={<NotFound />} />
            {/* <Route path='/iwo-land' element={<IwoLand />} /> */}
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/gallery' element={<Gallery />} />
            <Route path='/singleblog/:id' element={<SingleBlog />} />
            <Route path='/admin-login' element={<AdminLogin />} />
            <Route path='/application-form' element={<ApplicationForm />} />
            <Route path='/players' element={<PlayersPage />} />
            {/* <Route path='/admin-signup' element={<AdminSignup />} /> */}
            
            <Route element={<ProtectedRoutes />}>
              <Route path='/admin' element={<Admin />} />
            </Route>
            
          </Routes>
          {/* <Footer /> */}

          <Toaster
          position="top-right"
          richColors
          closeButton
          visibleToasts={1}
          />
          {!shouldHideFooter && <Footer />}
        </NewsProvider>   
      </AuthProvider>  
      </>
    );
};

function App() {

  return (
    <>
     <BrowserRouter>
        <ScrollToTop />

        <AppContent/>
     </BrowserRouter>
    </>
  )
}

export default App
